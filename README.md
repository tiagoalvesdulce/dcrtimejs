# Dcrtimejs

> Javascript wrapper for [dcrtime](https://github.com/decred/dcrtime)

## Table of Contents

- [Dcrtimejs](#dcrtimejs)
  - [Table of Contents](#table-of-contents)
  - [Install](#install)
      - [yarn](#yarn)
      - [npm](#npm)
  - [Docs](#docs)
    - [DcrtimeResponse](#dcrtimeresponse)
    - [StatusResponse](#statusresponse)
    - [VersionsResponse](#versionsresponse)
    - [LastAnchorResponse](#lastanchorresponse)
    - [GetLastDigestsResponse](#getlastdigestsresponse)
    - [setNetwork](#setnetwork)
    - [getVersions](#getversions)
    - [getLastAnchor](#getlastanchor)
    - [getLastDigests](#getlastdigests)
    - [getStatus](#getstatus)
    - [timestamp](#timestamp)
    - [timestampFromBase64](#timestampfrombase64)
    - [Timestamp Results](#timestamp-results)
    - [verify](#verify)
    - [verifyFromBase64](#verifyfrombase64)
    - [Verify Results](#verify-results)
    - [getSHA256fromBase64](#getsha256frombase64)
    - [Usage](#usage)


## Install

If you want to use this library in a Nodejs environment make sure you are using Node v17.5+ because of [fetch](https://nodejs.org/uk/blog/release/v17.5.0/#add-fetch-api).

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
| digests | <code>array</code> | array of objects containing the SHA256, result, servertimestamp and chaininformation if applicable |
| id | <code>String</code> | unique identifier |

### StatusResponse
**Properties**

| Name | Type |
| --- | --- |
| id | <code>String</code> |

### VersionsResponse
**Properties**

| Name | Type |
| --- | --- |
| versions | <code>Array.&lt;Number&gt;</code> |
| routeprefixes | <code>Array.&lt;String&gt;</code> |

### LastAnchorResponse
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| chaintimestamp | <code>Number</code> | chain timestamp if the tx block has more than 6 confirmations |
| transaction | <code>String</code> | id of the latest successfully broadcasted tx |
| blockhash | <code>String</code> | block hash |
| blockheight | <code>Number</code> | block height |

### GetLastDigestsResponse
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| digests | <code>array</code> | array of objects containing the SHA256, result, servertimestamp and chaininformation if applicable |

### setNetwork
Sets the dcrtime server that will be used.
Default is mainnet. If network is "testnet", it will be set to testnet.
You can also send a custom URL if you want to use your own server

| Param   | Type                |
| ------- | ------------------- |
| network | <code>string</code> |

### getVersions
getVersions returns the versions available and its route prefixes

**Returns**: <code>Promise.&lt;<a href="#versionsresponse">VersionsResponse</a>&gt;</code> - A promise that returns <a href="#versionsresponse">VersionsResponse</a> if resolved

### getLastAnchor
getLastAnchor returns the last successful anchor info request

**Returns**: <code>Promise.&lt;<a href="#lastanchorresponse">LastAnchorResponse</a>&gt;</code> - A promise that returns <a href="#lastanchorresponse">LastAnchorResponse</a> if resolved

### getLastDigests
getLastAnchor returns the last n digests submitted

**Returns**: <code>Promise.&lt;<a href="#getlastdigestsresponse">GetLastDigestsResponse</a>&gt;</code> - A promise that returns <a href="#getlastdigestsresponse">GetLastDigestsResponse</a> if resolved

### getStatus
getStatus is used to ask the server if everything is running properly.

**Returns**: <code>Promise.&lt;<a href="#statusresponse">StatusResponse</a>&gt;</code> - A promise that returns <a href="#statusresponse">StatusResponse</a> if resolved

| Param | Type | Description |
| --- | --- | --- |
| id [optional] | <code>string</code> | Identifier that can be used if a unique identifier is required. A 200 Status and the unique identifier sent will be returned. |

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

### Timestamp Results

The 'result' key in the returned object means:
| Result | Description                                                           |
| ------ | --------------------------------------------------------------------- |
| 0      | Invalid                                                              |
| 1      | The HASH has been sent to the dcrtime server to be anchored                 |
| 2      | Hash was already in the server |

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

### Verify Results

The 'result' key in the returned object means:
| Result | Description                                                           |
| ------ | --------------------------------------------------------------------- |
| 0      | Invalid                                                              |
| 1      | Digest was found in the server and verified successfully                 |
| 3      | Digest was NOT found in the server and is not anchored |

### getSHA256fromBase64
Calculates the SHA256 hash of a 64bit encoded string

| Param  | Type                | Description           |
| ------ | ------------------- | --------------------- |
| base64 | <code>string</code> | base64 encoded string |

**Returns**: <code>string</code> - The SHA256 hash.

### Usage

```js
import dcrtime from "dcrtimejs";

dcrtime.setNetwork("testnet");
dcrtime.timestamp(["9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08"], "dcrtimejs");
dcrtime.timestampFromBase64(["dGVzdA=="], "dcrtimejs");
dcrtime.verify(["9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08"], "dcrtimejs");
dcrtime.verifyFromBase64(["dGVzdA=="], "dcrtimejs");
```
