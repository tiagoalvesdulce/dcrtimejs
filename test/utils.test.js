import { expect } from "chai";
import CryptoJS from "crypto-js";
import {
  convertToSHA256,
  removeTimestampsKey,
  base64ToArrayBuffer,
  arrayBufferToWordArray
} from "../src/utils.js";

function compareUint8Arrays (a, b) {
  for (let i = a.length; i > -1; i -= 1) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

describe("Given the base64ToArrayBuffer util", () => {
  it("Should throw an error if a string is not passed", () => {
    expect(base64ToArrayBuffer).to.throw(
      TypeError,
      "The first argument must be of type string"
    );
    expect(base64ToArrayBuffer, null).to.throw(
      TypeError,
      "The first argument must be of type string"
    );
    expect(base64ToArrayBuffer, 123).to.throw(
      TypeError,
      "The first argument must be of type string"
    );
    expect(base64ToArrayBuffer, []).to.throw(
      TypeError,
      "The first argument must be of type string"
    );
    expect(base64ToArrayBuffer, {}).to.throw(
      TypeError,
      "The first argument must be of type string"
    );
  });
  it("Should return an empty (byteLength: 0) ArrayBuffer if empty string is passed", () => {
    const arrayBuffer = base64ToArrayBuffer("");
    expect(arrayBuffer instanceof ArrayBuffer).to.eq(true);
    expect(arrayBuffer.byteLength).to.eq(0);
  });
  it("Should return the correct ArrayBuffer", () => {
    const arrayBuffer = base64ToArrayBuffer("dGVzdA==");
    expect(arrayBuffer instanceof ArrayBuffer).to.eq(true);
    expect(arrayBuffer.byteLength).to.eq(4);
    const i8ArrayBuffer = new Uint8Array(arrayBuffer);
    const i8Expected = new Uint8Array([116, 101, 115, 116]);
    expect(compareUint8Arrays(i8ArrayBuffer, i8Expected));
  });
});

describe("Given the arrayBufferToWordArray util", () => {
  it("Should throw an error if an ArrayBuffer is not passed", () => {
    expect(arrayBufferToWordArray).to.throw(
      TypeError,
      "The first argument must be an instance of ArrayBuffer"
    );
    expect(arrayBufferToWordArray, null).to.throw(
      TypeError,
      "The first argument must be an instance of ArrayBuffer"
    );
    expect(arrayBufferToWordArray, 123).to.throw(
      TypeError,
      "The first argument must be an instance of ArrayBuffer"
    );
    expect(arrayBufferToWordArray, []).to.throw(
      TypeError,
      "The first argument must be an instance of ArrayBuffer"
    );
    expect(arrayBufferToWordArray, {}).to.throw(
      TypeError,
      "The first argument must be an instance of ArrayBuffer"
    );
    expect(arrayBufferToWordArray, "test").to.throw(
      TypeError,
      "The first argument must be an instance of ArrayBuffer"
    );
  });
  it("Should return the correct WordArray", () => {
    const testArray = new Uint8Array([116, 101, 115, 116]); // equivalent to "test" string
    const wordArray = arrayBufferToWordArray(testArray.buffer);
    expect(wordArray.sigBytes).to.eq(4);
    expect(wordArray.toString(CryptoJS.enc.Hex)).to.eq("74657374");
    expect(wordArray.toString(CryptoJS.enc.Base64)).to.eq("dGVzdA=="); // note this base64 is the base64 representation of the "test" string
  });
});

describe("Given the convertToSHA256 util", () => {
  it("Should throw if a string is not passed", () => {
    expect(convertToSHA256).to.throw(
      TypeError,
      "The first argument must be of type string"
    );
    expect(convertToSHA256, null).to.throw(
      TypeError,
      "The first argument must be of type string"
    );
    expect(convertToSHA256, 123).to.throw(
      TypeError,
      "The first argument must be of type string"
    );
    expect(convertToSHA256, []).to.throw(
      TypeError,
      "The first argument must be of type string"
    );
    expect(convertToSHA256, {}).to.throw(
      TypeError,
      "The first argument must be of type string"
    );
  });
  it("Should return the correct SHA256", () => {
    expect(convertToSHA256("")).to.eq(
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    );
    expect(convertToSHA256("test")).to.eq(
      "6617aa88a72e6b526b88cbceda388a7b52a0e856148a12d9b8429cd2a53a3ea4"
    );
  });
});

describe("Given the removeTimestampsKey util", () => {
  it("Should remove timestamps key from an object", () => {
    expect(
      removeTimestampsKey({ key1: "test", key2: "test2", timestamps: "test3" })
    ).to.deep.equal({ key2: "test2", key1: "test" });
  });
});
