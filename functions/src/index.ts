import {constants as statuscode} from "http2";
import {onRequest} from "firebase-functions/v2/https";
import {JSDOM} from "jsdom";

const selector = ".Box-header a svg.octicon";
export const defaultParams = {
  label: "Dependents",
  color: "blue",
  logo: "github",
};

export const getBadge = onRequest(async (req, resp) => {
  const account = req.query["account"];
  const project = req.query["project"];
  const color = req.query["color"] || defaultParams.color;
  const label = req.query["label"] ?? defaultParams.label;
  const logo = req.query["logo"] ?? defaultParams.logo;

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

  const {window} = new JSDOM(await ghResp.text());
  const total = Array
    .from(window.document.querySelectorAll<HTMLElement>(selector))
    .map((svg) => {
      const {parentElement} = svg;
      parentElement?.removeChild(svg);
      return parentElement as HTMLElement;
    })
    .reduce((a, b) => a + parseInt(
      b.innerHTML
        ?.replace(/\\n|,/g, "")
        ?.trim()
        ?.split(" ")[0] || "") || 0, 0
    )
    .toLocaleString();

  // NOTE: cached every 3 hours
  resp.set("Cache-Control", "public, max-age=10800, stale-if-error=18000");
  resp.redirect(`https://img.shields.io/badge/${label}-${total}-${color}?logo=${logo}`);
});
