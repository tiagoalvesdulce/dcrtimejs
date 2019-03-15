"use strict";
import { assert } from "chai";
import dcrtime from "../dcrtime";

dcrtime.setNetwork("testnet");

describe("timestamp", function () {
  it("should return an error if files array is malformed (not [{payload: string}])", async () => {
    const res = await dcrtime.timestamp([{ paload: "dGVzdA==" }]);
    assert.typeOf(res, "error");
  });
  it("should return an object", async () => {
    const res = await dcrtime.timestamp([{ payload: "dGVzdAiu==" }]);
    assert.isObject(res);
    console.log(JSON.stringify(res, null, 2));
    assert.hasAllKeys(res, ["id", "servertimestamp", "digests", "results"]);
  });
});

describe("verify", function () {
  it("should return an error if files array is malformed (not [{payload: string}])", async () => {
    const res = await dcrtime.verify([{ paload: "dGVzdA==" }]);
    assert.typeOf(res, "error");
  });
  it("should return an object", async () => {
    const res = await dcrtime.verify([{ payload: "dGVzdAdGVzdA==" }, { payload: "abcd" }]);
    assert.isObject(res);
    assert.hasAllKeys(res, ["id", "digests", "timestamps"]);
  });
});
