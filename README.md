# Dcrtimejs

> Javascript library to use [dcrtime](https://github.com/decred/dcrtime)

## Table of Contents

- [Dcrtimejs](#dcrtimejs)
  - [Table of Contents](#table-of-contents)
  - [Install](#install)
      - [yarn](#yarn)
      - [npm](#npm)
  - [Docs](#docs)
    - [DcrtimeResponse](#dcrtimeresponse)
    - [setNetwork](#setnetwork)
    - [timestamp](#timestamp)
    - [timestampFromBase64](#timestampfrombase64)
    - [verify](#verify)
    - [verifyFromBase64](#verifyfrombase64)
    - [Results](#results)
    - [Usage](#usage)


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

### DcrtimeResponse
**Properties**

| Name    | Type               | Description                                                        |
| ------- | ------------------ | ------------------------------------------------------------------ |
| digests | <code>array</code> | array of objects containing the SHA256, result and servertimestamp |

### setNetwork
Sets the dcrtime server that will be used.
Default is mainnet. If network is "testnet", it will be set to testnet instead.

| Param   | Type                |
| ------- | ------------------- |
| network | <code>string</code> |

### timestamp
Timestamps an array of SHA256 hashs using dcrtime.


| Param         | Type                       | Description                                                    |
| ------------- | -------------------------- | -------------------------------------------------------------- |
| digests       | <code>Array[string]</code> | Array of SHA256 hashs                                          |
| id [optional] | <code>string</code>        | Identifier that can be used if a unique identifier is required |

**Returns**: <code>Promise.&lt;<a href="#dcrtimeresponse">DcrtimeResponse</a>&gt;</code> - The data from dcrtime.

### timestampFromBase64
Timestamps an array of base 64 encoded strings using dcrtime.


| Param         | Type                       | Description                                                    |
| ------------- | -------------------------- | -------------------------------------------------------------- |
| base64s       | <code>Array[string]</code> | Array of base64 encoded strings                                |
| id [optional] | <code>string</code>        | Identifier that can be used if a unique identifier is required |

**Returns**: <code>Promise.&lt;<a href="#dcrtimeresponse">DcrtimeResponse</a>&gt;</code> - The data from dcrtime.

### verify

Verifies if an array of SHA256 hashs is anchored to the blockchain.

| Param         | Type                       | Description                                                    |
| ------------- | -------------------------- | -------------------------------------------------------------- |
| digests       | <code>Array[string]</code> | Array of SHA256 hashs                                          |
| id [optional] | <code>string</code>        | Identifier that can be used if a unique identifier is required |

**Returns**: <code>Promise.&lt;<a href="#dcrtimeresponse">DcrtimeResponse</a>&gt;</code> - The data from dcrtime.

### verifyFromBase64

Verifies if an array of base 64 encoded strings is anchored to the blockchain.

| Param         | Type                       | Description                                                    |
| ------------- | -------------------------- | -------------------------------------------------------------- |
| base64s       | <code>Array[string]</code> | Array of base64 encoded strings                                |
| id [optional] | <code>string</code>        | Identifier that can be used if a unique identifier is required |

**Returns**: <code>Promise.&lt;<a href="#dcrtimeresponse">DcrtimeResponse</a>&gt;</code> - The data from dcrtime.

### Results

The 'result' key in the returned object means:

| Result | Description                                                           |
| ------ | --------------------------------------------------------------------- |
| 0      | Success.                                                              |
| 1      | the file was already in the server. Timestamp failed.                 |
| 2      | the file was NOT found in the server, which means it is not anchored. |

### Usage

```js
import dcrtime from "dcrtimejs";

dcrtime.setNetwork("testnet");
dcrtime.timestamp(["9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08"], "dcrtimejs");
dcrtime.timestampFromBase64(["dGVzdA=="], "dcrtimejs");
dcrtime.verify(["9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08"], "dcrtimejs");
dcrtime.verifyFromBase64(["dGVzdA=="], "dcrtimejs");
```
