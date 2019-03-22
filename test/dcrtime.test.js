"use strict";
import { assert } from "chai";
import dcrtime from "../dcrtime";

describe("testnet", () => {
  dcrtime.setNetwork("testnet");
  describe("timestamp from base 64", () => {
    it("should return an error if files array is malformed (not [{payload: base64string}])", async () => {
      const res = await dcrtime.timestampFromBase64([{ paload: "dGVzdA==" }]);
      assert.typeOf(res, "error");
    });
    it("should return an object", async () => {
      const res = await dcrtime.timestampFromBase64([{ payload: "dGVzdAiu==" }]);
      assert.isObject(res);
      assert.hasAllKeys(res, ["id", "digests"]);
    });
  });

  describe("timestamp", () => {
    it("should return an error if files array is malformed (not [{payload: sha256}])", async () => {
      const res = await dcrtime.timestamp([{ paload: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08" }]);
      assert.typeOf(res, "object");
      assert.hasAllKeys(res, ["error"]);
    });
    it("should return an object", async () => {
      const res = await dcrtime.timestamp([{ payload: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08" }]);
      assert.isObject(res);
      assert.hasAllKeys(res, ["id", "digests"]);
    });
  });

  describe("verify from base 64", () => {
    it("should return an error if files array is malformed (not [{payload: base64string}])", async () => {
      const res = await dcrtime.verifyFromBase64([{ paload: "dGVzdA==" }]);
      assert.typeOf(res, "error");
    });
    it("should return an object", async () => {
      const res = await dcrtime.verifyFromBase64([{ payload: "dGVzdAdGVzdA==" }]);
      assert.isObject(res);
      assert.hasAllKeys(res, ["id", "digests"]);
    });
  });

  describe("verify", () => {
    it("should return an error if files array is malformed (not [{payload: sha256}])", async () => {
      const res = await dcrtime.verify([{ paload: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08" }]);
      assert.typeOf(res, "object");
      assert.hasAllKeys(res, ["error"]);
    });
    it("should return an object", async () => {
      const res = await dcrtime.verify([{ payload: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08" }]);
      assert.isObject(res);
      assert.hasAllKeys(res, ["id", "digests"]);
    });
  });
});

describe("mainnet", () => {
  dcrtime.setNetwork("mainnet");
  describe("timestamp from base 64", () => {
    it("should return an error if files array is malformed (not [{payload: base64string}])", async () => {
      const res = await dcrtime.timestampFromBase64([{ paload: "dGVzdA==" }]);
      assert.typeOf(res, "error");
    });
    it("should return an object", async () => {
      const res = await dcrtime.timestampFromBase64([{ payload: "dGVzdAiu==" }]);
      assert.isObject(res);
      assert.hasAllKeys(res, ["id", "digests"]);
    });
  });

  describe("timestamp", () => {
    it("should return an error if files array is malformed (not [{payload: sha256}])", async () => {
      const res = await dcrtime.timestamp([{ paload: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08" }]);
      assert.typeOf(res, "object");
      assert.hasAllKeys(res, ["error"]);
    });
    it("should return an object", async () => {
      const res = await dcrtime.timestamp([{ payload: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08" }]);
      assert.isObject(res);
      assert.hasAllKeys(res, ["id", "digests"]);
    });
  });

  describe("verify from base 64", () => {
    it("should return an error if files array is malformed (not [{payload: base64string}])", async () => {
      const res = await dcrtime.verifyFromBase64([{ paload: "dGVzdA==" }]);
      assert.typeOf(res, "error");
    });
    it("should return an object", async () => {
      const res = await dcrtime.verifyFromBase64([{ payload: "dGVzdAdGVzdA==" }]);
      assert.isObject(res);
      assert.hasAllKeys(res, ["id", "digests"]);
    });
  });

  describe("verify", () => {
    it("should return an error if files array is malformed (not [{payload: sha256}])", async () => {
      const res = await dcrtime.verify([{ paload: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08" }]);
      assert.typeOf(res, "object");
      assert.hasAllKeys(res, ["error"]);
    });
    it("should return an object", async () => {
      const res = await dcrtime.verify([{ payload: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08" }]);
      assert.isObject(res);
      assert.hasAllKeys(res, ["id", "digests"]);
    });
  });
});
