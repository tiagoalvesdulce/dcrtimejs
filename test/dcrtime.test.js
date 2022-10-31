"use strict";
import { assert } from "chai";
import dcrtime from "../dcrtime.js";

describe("testnet", () => {
  dcrtime.setNetwork("testnet");
  describe("timestamp from base 64", () => {
    it("should return an object", async () => {
      const res = await dcrtime.timestampFromBase64(["dGVzdAiu=="]);
      assert.isObject(res);
      assert.hasAllKeys(res, ["id", "digests"]);
    });
  });

  describe("timestamp", () => {
    it("should return an error if a string is not a SHA256)", async () => {
      it("should return an object", async () => {
        const res = await dcrtime.timestamp([
          "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
        ]);
        assert.isObject(res);
        assert.hasAllKeys(res, ["id", "digests"]);
      });
    });

    describe("verify from base 64", () => {
      it("should return an object", async () => {
        const res = await dcrtime.verifyFromBase64(["dGVzdAdGVzdA=="]);
        assert.isObject(res);
        assert.hasAllKeys(res, ["id", "digests"]);
      });
    });

    describe("verify", () => {
      it("should return an object", async () => {
        const res = await dcrtime.verify([
          "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
        ]);
        assert.isObject(res);
        assert.hasAllKeys(res, ["id", "digests"]);
      });
    });
  });

  describe("mainnet", () => {
    dcrtime.setNetwork("mainnet");
    describe("timestamp from base 64", () => {
      it("should return an object", async () => {
        const res = await dcrtime.timestampFromBase64(["dGVzdAiu=="]);
        assert.isObject(res);
        assert.hasAllKeys(res, ["id", "digests"]);
      });
    });

    describe("timestamp", () => {
      it("should return an object", async () => {
        const res = await dcrtime.timestamp([
          "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
        ]);
        assert.isObject(res);
        assert.hasAllKeys(res, ["id", "digests"]);
      });
    });

    describe("verify from base 64", () => {
      it("should return an object", async () => {
        const res = await dcrtime.verifyFromBase64(["dGVzdAdGVzdA=="]);
        assert.isObject(res);
        assert.hasAllKeys(res, ["id", "digests"]);
      });
    });

    describe("verify", () => {
      it("should return an object", async () => {
        const res = await dcrtime.verify([
          "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
        ]);
        assert.isObject(res);
        assert.hasAllKeys(res, ["id", "digests"]);
      });
    });
  });
});
