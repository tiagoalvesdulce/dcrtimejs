# Dcrtimejs

> Javascript library to use [dcrtime](https://github.com/decred/dcrtime)

## Table of Contents

* [Install](#install)
* [Docs](#files)
    * [setNetwork](#setNetwork)
    * [timestamp](#timestamp)
    * [timestampFromBase64](#timestampFromBase64)
    * [verify](#verify)
    * [verifyFromBase64](#verifyFromBase64)
* [Results](#results)
* [Usage](#usage)



<a href="install"></a>

## Install

Make sure you have [nodejs](https://nodejs.org/en/) 7.6+ and [yarn](https://yarnpkg.com/en/) or [npm](https://www.npmjs.com/) installed.

#### yarn

```bash
yarn add dcrtimejs
```

#### npm

```bash
npm install --save dcrtimejs
```

## Docs

<a href="Info"></a>

### Info : <code>object</code>
**Properties**

| Name    | Type                | Description                    |
| ------- | ------------------- | ------------------------------ |
| payload | <code>string</code> | 64bit encoded string or SHA256 |

<a href="dcrtimeResponse"></a>

### DcrtimeResponse : <code>object</code>
**Properties**

| Name    | Type               | Description                                                        |
| ------- | ------------------ | ------------------------------------------------------------------ |
| digests | <code>array</code> | array of objects containing the SHA256, result and servertimestamp |

___

<a href="setNetwork"></a>

### setNetwork(network)
setNetwork sets the dcrtime server that will be used.
Default is mainnet. If network is "testnet", it will be set to testnet instead.

| Param   | Type                |
| ------- | ------------------- |
| network | <code>string</code> |

___

<a href="timestamp"></a>

### timestamp(info, id) ⇒ <code>Promise.&lt;<a href="#dcrtimeResponse">DcrtimeResponse</a>&gt;</code>
Timestamps an array of the format [{payload: SHA256}] using dcrtime.


| Param         | Type                        | Description                                                    |
| ------------- | --------------------------- | -------------------------------------------------------------- |
| info          | [<code>Info</code>](#Info) |                                                                |
| id [optional] | <code>string</code>         | Identifier that can be used if a unique identifier is required |

**Returns**: <code>Promise.&lt;<a href="#dcrtimeResponse">DcrtimeResponse</a>&gt;</code> - The data from dcrtime.
___

<a href="timestampFromBase64"></a>

### timestampFromBase64(info, id) ⇒ <code>Promise.&lt;<a href="#dcrtimeResponse">DcrtimeResponse</a>&gt;</code>
timestamp timestamps an array of the format [{payload: base64string}] using dcrtime.


| Param         | Type                        | Description                                                    |
| ------------- | --------------------------- | -------------------------------------------------------------- |
| info          | [<code>Info</code>](#Info) |                                                                |
| id [optional] | <code>string</code>         | Identifier that can be used if a unique identifier is required |

**Returns**: <code>Promise.&lt;<a href="#dcrtimeResponse">DcrtimeResponse</a>&gt;</code> - The data from dcrtime.

___

<a href="verify"></a>

### verify(info, id) ⇒ <code>Promise.&lt;<a href="#dcrtimeResponse">DcrtimeResponse</a>&gt;</code>
Verifies if an array of the format [{payload: SHA256}] is anchored to the blockchain.

| Param         | Type                        | Description                                                    |
| ------------- | --------------------------- | -------------------------------------------------------------- |
| info          | [<code>Info</code>](#Info) |                                                                |
| id [optional] | <code>string</code>         | Identifier that can be used if a unique identifier is required |

**Returns**: <code>Promise.&lt;<a href="#dcrtimeResponse">DcrtimeResponse</a>&gt;</code> - The data from dcrtime.

___

<a href="verifyFromBase64"></a>

### verifyFromBase64(info, id) ⇒ <code>Promise.&lt;<a href="#dcrtimeResponse">DcrtimeResponse</a>&gt;</code>
Verifies if an array of the format [{payload base64string}] is anchored to the blockchain.

| Param         | Type                        | Description                                                    |
| ------------- | --------------------------- | -------------------------------------------------------------- |
| info          | [<code>Info</code>](#Info) |                                                                |
| id [optional] | <code>string</code>         | Identifier that can be used if a unique identifier is required |

**Returns**: <code>Promise.&lt;<a href="#dcrtimeResponse">DcrtimeResponse</a>&gt;</code> - The data from dcrtime.

___

<a href="results"></a>

### Results

The 'result' key in the returned object means:

| Result | Description                                                           |
| ------ | --------------------------------------------------------------------- |
| 0      | Success.                                                              |
| 1      | the file was already in the server. Timestamp failed.                 |
| 2      | the file was NOT found in the server, which means it is not anchored. |

___

<a href="usage"></a>

### Usage

```js
import dcrtime from "dcrtimejs";

dcrtime.setNetwork("testnet");
dcrtime.timestamp([{ payload: "9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08"}], "dcrtimejs");
dcrtime.timestampFromBase64([{ payload: "dGVzdA=="}], "dcrtimejs");
dcrtime.verify([{ payload: "9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08"}], "dcrtimejs");
dcrtime.verifyFromBase64([{ payload: "dGVzdA=="}], "dcrtimejs");
```
