/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {constants as statuscode} from "http2";
import {describe, jest, test, expect} from "@jest/globals";

import {getBadge, defaultParams} from "./index";

interface RequestStub {
    query: Record<string, any>;
}

interface ResponseStub {
    redirect: jest.Mock;
    sendStatus: jest.Mock;
    status: jest.Mock;
    send: jest.Mock;
    set: jest.Mock;
}

function getReqSub(params: Record<string, any>):RequestStub {
  return {
    query: params,
  };
}

function getRespSub():ResponseStub {
  return {
    sendStatus: jest.fn(),
    status: jest.fn(),
    send: jest.fn(),
    redirect: jest.fn(),
    set: jest.fn(),
  };
}

describe("testing getBadge", () => {
  test("test missing project query param", async () => {
    const req = getReqSub({account: "testing"});
    const resp = getRespSub();

    await getBadge(req as any, resp as any);

    expect(resp.status)
      .toHaveBeenCalledWith(statuscode.HTTP_STATUS_BAD_REQUEST);
  });

  test("test missing account query param", async () => {
    const req = getReqSub({project: "testing"});
    const resp = getRespSub();

    await getBadge(req as any, resp as any);

    expect(resp.status)
      .toHaveBeenCalledWith(statuscode.HTTP_STATUS_BAD_REQUEST);
  });

  test("test redirected to shields.io successfully", async () => {
    const resp = getRespSub();
    const logo = "python";
    const color = "black";
    const label = "Users";
    const req = getReqSub({
      "account": "torvalds",
      "project": "linux",
      label,
      color,
      logo,
    });

    await getBadge(req as any, resp as any);

    expect(resp.set)
      .toHaveBeenCalledWith(expect.anything(), expect.anything());
    expect(resp.redirect)
      .toHaveBeenCalledWith(`https://img.shields.io/badge/${label}-0-${color}?logo=${logo}`);
  });

  test("test redirected to shields.io with defaults successfully", async () => {
    const resp = getRespSub();
    const logo = defaultParams.logo;
    const color = defaultParams.color;
    const label = defaultParams.label;
    const req = getReqSub({"account": "torvalds", "project": "linux"});

    await getBadge(req as any, resp as any);

    expect(resp.set)
      .toHaveBeenCalledWith(expect.anything(), expect.anything());
    expect(resp.redirect)
      .toHaveBeenCalledWith(`https://img.shields.io/badge/${label}-0-${color}?logo=${logo}`);
  });
});
