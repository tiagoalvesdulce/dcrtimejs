"use strict";
import { convertToSHA256, mergeResultsAndDigests, removeTimestampsKey } from "./utils.js";
/**
 * @typedef {Object} TimestampDigestObject
 * @property {String} digest
 * @property {Number} result
 */
/**
 * @typedef {Object} TimestampResponse
 * @property {TimestampDigestObject[]} digests
 * @property {String} id
 */
/**
 * @typedef {Object} ChainInformation
 * @property {String} transaction
 * @property {String} merkleroot
 * @property {Object} merklepath
 */
/**
 * @typedef {Object} VerifyDigestObject
 * @property {String} digest
 * @property {Number} servertimestamp
 * @property {Number} result
 * @property {ChainInformation} chaininformation
 */
/**
 * @typedef {Object} VerifyResponse
 * @property {VerifyDigestObject[]} digests
 * @property {String} id
 */
/**
 * @typedef {Object} StatusResponse
 * @property {String} id
 */
/**
 * @typedef {Object} VersionsResponse
 * @property {Number[]} versions
 * @property {String[]} routeprefixes
 */
/**
 * @typedef {Object} LastAnchorResponse
 * @property {Number} chaintimestamp chain timestamp if the tx block has more than 6 confirmations
 * @property {String} transaction id of the latest successfully broadcasted tx
 * @property {String} blockhash block hash
 * @property {Number} blockheight block height
 */
/**
 * @typedef {Object} GetLastDigestResponse
 * @property {VerifyDigestObject[]} digests
 */

export default (function () {
  let apiBase = "https://time.decred.org:49152"; // Default is mainnet

  const getUrl = (path, version = "v2") => `${apiBase}/${version}/${path}`;

  const post = async (path, json = {}) => {
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
  };

  return {
    /**
     * setNetwork sets the dcrtime server that will be used.
     * Default is mainnet. If network is "testnet", it will be set to testnet.
     * You can also send a custom URL if you want to use your own server
     * @param {String} network
     */
    setNetwork (network) {
      if (network === "testnet") {
        apiBase = "https://time-testnet.decred.org:59152";
      } else if (network === "mainnet") {
        apiBase = "https://time.decred.org:49152";
      } else {
        apiBase = network;
      }
    },
    /**
     * getVersions returns the versions available and its route prefixes
     * @async
     * @return {Promise<VersionsResponse>} A promise that returns {@link VersionsResponse} if resolved
     */
    async getVersions () {
      try {
        const res = await fetch(`${apiBase}/version`);
        const resJson = res.json();
        return resJson;
      } catch (e) {
        const err = new Error("Invalid server response");
        throw err;
      }
    },
    /**
     * getLastAnchor returns the last successful anchor info request
     * @async
     * @returns {Promise<LastAnchorResponse>} A promise that returns {@link LastAnchorResponse} if resolved
     */
    async getLastAnchor () {
      try {
        const res = await fetch(getUrl("last"));
        const resJson = res.json();
        return resJson;
      } catch (e) {
        const err = new Error("Invalid server response");
        throw err;
      }
    },
    /**
     * getStatus is used to ask the server if everything is running properly.
     * @async
     * @param {string} [id] *Optional. Identifier that can be used if a unique identifier is required.
     * A 200 Status and the unique identifier sent will be returned.
     * @return {Promise<StatusResponse>} A promise that returns {@link StatusResponse} if resolved
     */
    async getStatus (id) {
      const res = await post("status", id ? { id } : {});
      return res;
    },
    /**
     * getSHA256fromBase64 calculates the SHA256 hash of a 64bit encoded string
     * @async
     * @param {string} payload 64 bit string
     * @return {string} SHA256 hash
     */
    getSHA256fromBase64 (payload) {
      return convertToSHA256(payload);
    },
    /**
     * timestamp timestamps an array of the format [{payload: SHA256}] using dcrtime.
     *
     * The 'result' key in the returned object means:
     * 0 | Invalid.
     * 1 | Digest was not found in the server. Timestamp successful.
     * 2 | Digest was already in the server. Timestamp failed.
     * @async
     * @param {array} digests
     * @param {string} [id] *Optional. Identifier that can be used if a unique identifier is required
     * @return {Promise<TimestampResponse>} A promise that returns {@link TimestampResponse} if resolved
     */
    async timestamp (digests, id) {
      const res = await post("timestamp/batch", {
        id,
        digests
      });
      return mergeResultsAndDigests(res);
    },
    /**
     * timestampFromBase64 timestamps an array of the format [{payload: base64string}] using dcrtime.
     *
     * The 'result' key in the returned object means:
     * 0 | Invalid.
     * 1 | Digest was not found in the server. Timestamp successful.
     * 2 | Digest was already in the server. Timestamp failed. Only happens on timestamp
     * @function timestampFromBase64
     * @param {array} base64s
     * @param {string} [id] *Optional. Identifier that can be used if a unique identifier is required
     * @return {Promise<TimestampResponse>} A promise that returns {@link TimestampResponse} if resolved
     */
    async timestampFromBase64 (base64s, id) {
      const res = await post("timestamp/batch", {
        id,
        digests: base64s.map((b) => convertToSHA256(b))
      });
      return mergeResultsAndDigests(res);
    },
    /**
     * verify verifies if an array of the format [{payload: SHA256}] is anchored to the blockchain.
     *
     * The 'result' key in the returned object means:
     * 0 | Invalid.
     * 1 | Digest was found in the server and verified successfully.
     * 3 | Digest was NOT found in the server and is not anchored
     * @async
     * @param {array} digests
     * @param {string} id *Optional. Identifier that can be used if a unique identifier is required
     * @return {Promise<VerifyResponse>} A promise that returns {@link VerifyResponse} if resolved
     */
    async verify (digests, id) {
      const res = await post("verify/batch", {
        id,
        digests
      });
      return removeTimestampsKey(res);
    },
    /**
     * verifyFromBase64 verifies if an array of the format [{payload: base64string}] is anchored to the blockchain.
     *
     * The 'result' key in the returned object means:
     * 0 | Invalid.
     * 1 | Digest was found in the server and verified successfully.
     * 3 | Digest was NOT found in the server and is not anchored
     * @async
     * @param {array} base64s
     * @param {string} [id] *Optional. Identifier that can be used if a unique identifier is required
     * @return {Promise<VerifyResponse>} A promise that returns {@link VerifyResponse} if resolved
     */
    async verifyFromBase64 (base64s, id) {
      const res = await post("verify/batch", {
        id,
        digests: base64s.map((b) => convertToSHA256(b))
      });
      return removeTimestampsKey(res);
    },
    /**
     * getLastDigests is used to ask the server the last n digests submitted.
     * @async
     * @param {number} [n] *Optional. Number of digests to get. Default is 10
     * @return {Promise<GetLastDigestResponse>} A promise that returns {@link GetLastDigestResponse} if resolved
     */
    async getLastDigests (n = 10) {
      return await post("last-digests", {
        number: n
      });
    }
  };
})();
