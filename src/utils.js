"use strict";
import CryptoJS from "crypto-js";

/**
 * convertToSHA256 converts a string to a SHA256 hash.
 * @param {string} payload string to be converted
 * @return {string} SHA256 hash
 */
export const convertToSHA256 = (payload) =>
  CryptoJS.SHA256(
    arrayBufferToWordArray(base64ToArrayBuffer(payload))
  ).toString(CryptoJS.enc.Hex);

/**
 * The timestamp endpoint returns the results like this:
 * {
 *  digests: [A, B],
 *  results: [0, 1]
 * }
 *
 * This util merge digests and results so the example above looks like this:
 * {
 *  digests: [
 *  { digest: A, result: 0 },
 *  { digest: B, result: 1 }
 *  ]
 * }
 */
export const mergeResultsAndDigests = ({
  results,
  digests,
  ...obj
}) => {
  return obj.error
    ? obj
    : {
        ...obj,
        digests:
            digests &&
            digests.map((digest, i) => ({
              digest,
              result: results[i]
            }))
      };
};

/**
 * Remove timestamps key from an object.
 * Util to remove the timestamps key returned by the verify request when not querying collections
 */
export const removeTimestampsKey = ({ timestamps, ...obj }) => obj;

/**
 * base64ToArrayBuffer converts a base64 to an ArrayBuffer
 * @param {string} base64 Base 64 string
 * @return {ArrayBuffer} Array of unsigned 8 bit integers
 */
export const base64ToArrayBuffer = (base64) => {
  if (typeof base64 !== "string") throw TypeError("The first argument must be of type string");
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
 * @return {CryptoJS.lib.WordArray} Array of 32 bit integers
 */
export const arrayBufferToWordArray = (ab) => {
  if (!(ab instanceof ArrayBuffer)) throw TypeError("The first argument must be an instance of ArrayBuffer");
  const i8a = new Uint8Array(ab);
  const a = [];
  for (let i = 0; i < i8a.length; i += 4) {
    a.push(
      (i8a[i] << 24) | (i8a[i + 1] << 16) | (i8a[i + 2] << 8) | i8a[i + 3]
    );
  }
  return CryptoJS.lib.WordArray.create(a, i8a.length);
};
