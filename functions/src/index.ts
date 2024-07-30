import {constants as statuscode} from "http2";
import {onRequest} from "firebase-functions/v2/https";
import * as cheerio from "cheerio";

const selector = ".Box-header a";
export const defaultParams = {
  label: "Dependents",
  color: "blue",
  logo: "github",
};

export const getBadge = onRequest(async (req, resp) => {
  const account = req.query["account"];
  const project = req.query["project"];
  const color = (req.query["color"] || defaultParams.color) as string;
  const label = (req.query["label"] ?? defaultParams.label) as string;
  const logo = (req.query["logo"] ?? defaultParams.logo) as string;

  if (!account || !project) {
    resp.status(statuscode.HTTP_STATUS_BAD_REQUEST);
    resp.send("missing account or project query params");
    return;
  }

  const ghUrl = `https://github.com/${account}/${project}/network/dependents`;
  const ghResp = await fetch(ghUrl);

  if (!ghResp.ok) {
    resp.sendStatus(ghResp.status);
    return;
  }

  const $ = cheerio.load(await ghResp.text());
  let total = 0;

  $(selector).each((_, e) => {
    total += parseInt($(e)
      .text()
      .replace(/\n|,/g, "")
      .trim()
      .split(" ")[0]
    );
  });

  // NOTE: cached every 3 hours
  resp.set("Cache-Control", "public, max-age=10800, stale-if-error=18000");
  resp.redirect(getShieldsUrl(label, total.toLocaleString(), color, logo));
});

export const getShieldsUrl =
  (label: string, total: string, color: string, logo: string) =>
    `https://img.shields.io/badge/${label}-${total}-${color}?logo=${logo}`;
