"use strict";

import CryptoJS from "crypto-js";
import fetch from "node-fetch";

/**
 * @typedef {Object} DcrtimeResponse
 * @property {array} digests
 * @property {string} id
 */

export default (function () {
  let apiBase = "https://time.decred.org:49152";

  const getUrl = (path, version = "v1") => `${apiBase}/${version}/${path}`;

  const post = async (path, json) => {
    try {
      const response = await fetch(getUrl(path), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(json)
      });
      const responseJSON = response.json();
      return responseJSON;
    } catch (e) {
      const err = new Error("Invalid server response");
      throw err;
    }
  };

  const mergeResultsAndDigests = ({ results, digests, servertimestamp, ...obj }) => {
    return obj.error ? obj : {
      ...obj,
      digests: digests && digests.map((digest, i) => ({ digest: digest, result: results[i], servertimestamp }))
    };
  };

  const removeTimestampsKey = ({ timestamps, ...obj }) => obj;

  /**
   * base64ToArrayBuffer converts a base64 to an ArrayBuffer
   * @param {string} base64 Base 64 string
   * @return {ArrayBuffer} Array of unsigned 8 bit integers
   */
  const base64ToArrayBuffer = base64 => {
    const buf = Buffer.from(base64, "base64");
    const binaryString = buf.toString("binary");
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  /**
   * arrayBuffertoWordArray converts an ArrayBuffer to CryptoJS' internal WordArray.
   * @param {ArrayBuffer} ab Array of unsigned 8 bit integers
   * @return {WordArray} Array of 32 bit integers
   */
  const arrayBufferToWordArray = ab => {
    const i8a = new Uint8Array(ab);
    const a = [];
    for (let i = 0; i < i8a.length; i += 4) {
      a.push(
        (i8a[i] << 24) | (i8a[i + 1] << 16) | (i8a[i + 2] << 8) | i8a[i + 3]
      );
    }
    return CryptoJS.lib.WordArray.create(a, i8a.length);
  };

  return {
    /**
     * setNetwork sets the dcrtime server that will be used.
     * Default is mainnet. If network is "testnet", it will be set to testnet instead.
     * @function setNetwork
     * @param {string} network
     */
    setNetwork (network) {
      apiBase = network === "testnet" ? "https://time-testnet.decred.org:59152" : "https://time.decred.org:49152";
    },
    /**
     * getSHA256fromBase64 calculates the SHA256 hash of a 64bit encoded string
     * @param {string} payload 64 bit string
     * @return {string} SHA256 hash
     */
    getSHA256fromBase64 (payload) {
      return CryptoJS.SHA256(
        arrayBufferToWordArray(base64ToArrayBuffer(payload))
      ).toString(CryptoJS.enc.Hex);
    },
    /**
     * timestamp timestamps an array of the format [{payload: SHA256}] using dcrtime.
     *
     * The 'result' key in the returned object means:
     *
     * 0 | the file was not found in the server. Timestamp successful.
     *
     * 1 | the file was already in the server. Timestamp failed.
     * @function timestamp
     * @param {array} digests
     * @param {string} [id] *Optional. Identifier that can be used if a unique identifier is required
     * @return {Promise<DcrtimeResponse>} The data from dcrtime.
     */
    async timestamp (digests, id) {
      try {
        const res = await post("timestamp/", {
          id,
          digests
        });
        return mergeResultsAndDigests(res);
      } catch (err) {
        return err;
      }
    },
    /**
     * timestampFromBase64 timestamps an array of the format [{payload: base64string}] using dcrtime.
     *
     * The 'result' key in the returned object means:
     *
     * 0 | the file was not found in the server. Timestamp successful.
     *
     * 1 | the file was already in the server. Timestamp failed.
     * @function timestampFromBase64
     * @param {array} base64s
     * @param {string} [id] *Optional. Identifier that can be used if a unique identifier is required
     * @return {Promise<DcrtimeResponse>} The data from dcrtime.
     */
    async timestampFromBase64 (base64s, id) {
      try {
        const res = await post("timestamp/", {
          id,
          digests: base64s.map(b => this.getSHA256fromBase64(b))
        });
        return mergeResultsAndDigests(res);
      } catch (err) {
        return err;
      }
    },
    /**
     * verify verifies if an array of the format [{payload: SHA256}] is anchored to the blockchain.
     *
     * The 'result' key in the returned object means:
     *
     * 0 | the file was found in the server and verified successfully.
     *
     * 2 | the file was NOT found in the server, which means it is not anchored
     * @function verify
     * @param {array} digests
     * @param {string} id *Optional. Identifier that can be used if a unique identifier is required
     * @return {Promise<DcrtimeResponse>} The data from dcrtime.
     */
    async verify (digests, id) {
      try {
        const res = await post("verify/", {
          id,
          digests
        });
        return removeTimestampsKey(res);
      } catch (err) {
        return err;
      }
    },
    /**
     * verifyFromBase64 verifies if an array of the format [{payload: base64string}] is anchored to the blockchain.
     *
     * The 'result' key in the returned object means:
     *
     * 0 | the file was found in the server and verified successfully.
     *
     * 2 | the file was NOT found in the server, which means it is not anchored
     * @function verifyFromBase64
     * @param {array} base64s
     * @param {string} id *Optional. Identifier that can be used if a unique identifier is required
     * @return {Promise<DcrtimeResponse>} The data from dcrtime.
     */
    async verifyFromBase64 (base64s, id) {
      try {
        const res = await post("verify/", {
          id,
          digests: base64s.map(b => this.getSHA256fromBase64(b))
        });
        return removeTimestampsKey(res);
      } catch (err) {
        return err;
      }
    }
  };
})();
