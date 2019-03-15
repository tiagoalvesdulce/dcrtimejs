# Dcrtimejs

> Javascript library to use [dcrtime](https://github.com/decred/dcrtime)

## Table of Contents

* [Install](#install)
* [Docs](#files)
    * [setNetwork](#setNetwork)
    * [timestamp](#timestamp)
    * [verify](#verify)


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

<a href="files"></a>

### Files : <code>Object</code>
**Properties**

| Name    | Type                | Description          |
| ------- | ------------------- | -------------------- |
| payload | <code>string</code> | 64bit encoded string |

<a href="setNetwork"></a>

### setNetwork(network)
setNetwork sets the dcrtime server that will be used.
Default is mainnet. If network is "testnet", it will be set to testnet instead.

| Param   | Type                |
| ------- | ------------------- |
| network | <code>string</code> |

<a href="timestamp"></a>

### timestamp(files, id) ⇒ <code>Promise.&lt;Object&gt;</code>
timestamp timestamps an array of files using dcrtime.

The 'result' key in the returned object means:

| Result | Description                                                 |
| ------ | ----------------------------------------------------------- |
| 0      | the file was not found in the server. Timestamp successful. |
| 1      | the file was already in the server. Timestamp failed.       |

**Returns**: <code>Promise.&lt;Object&gt;</code> - The data from dcrtime.

| Param | Type                         | Description                                                    |
| ----- | ---------------------------- | -------------------------------------------------------------- |
| files | [<code>Files</code>](#Files) |                                                                |
| id [optional]    | <code>string</code>          | Identifier that can be used if a unique identifier is required |

<a href="verify"></a>

### verify(files, id) ⇒ <code>Promise.&lt;Object&gt;</code>
verify verifies if an array of files is anchored to the blockchain.

The 'result' key in the returned object means:

| Result | Description                                                           |
| ------ | --------------------------------------------------------------------- |
| 0      | the file was found in the server and verified successfully.           |
| 2      | the file was NOT found in the server, which means it is not anchored. |

**Returns**: <code>Promise.&lt;Object&gt;</code> - The data from dcrtime.

| Param | Type                         | Description                                                    |
| ----- | ---------------------------- | -------------------------------------------------------------- |
| files | [<code>Files</code>](#Files) |                                                                |
| id [optional]    | <code>string</code>          | Identifier that can be used if a unique identifier is required |

### Usage

```js
import dcrtime from "dcrtimejs";

dcrtime.setNetwork("testnet");
dcrtime.timestamp([{ payload: "dGVzdA=="}], "dcrtimejs");
dcrtime.verify([{ payload: "dGVzdA=="}], "dcrtimejs");
```
