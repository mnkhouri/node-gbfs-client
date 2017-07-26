# Node GBFS Client (CitiBike and others)

[![Build Status](https://img.shields.io/circleci/project/github/mnkhouri/node-gbfs-client.svg)](https://circleci.com/gh/mnkhouri/node-gbfs-client)
[![NPM Status](https://img.shields.io/npm/v/gbfs-client.svg)](https://www.npmjs.org/package/gbfs-client)

Lightweight client for General Bikeshare Feed Specification (GBFS) feeds, with a Promise-based API.

Compatible with the CitiBike NYC API.

## Installation

```
npm install gbfs-client --save
```

## Usage

```js
const GbfsClient = require('gbfs-client');
const gbfsClient = new GbfsClient('https://gbfs.citibikenyc.com/gbfs/en/');

gbfsClient.system()
    .then(system => console.log(system));
gbfsClient.stations()
    .then(stations => console.log(stations));
gbfsClient.stationStatus('124')
    .then(stationStatus => console.log(stationStatus));
```

### new GbfsClient(_baseUrl_)

- `baseUrl`: optional url for the GBFS API. Defaults to `'https://gbfs.citibikenyc.com/gbfs/en/'`, for NYC's CitiBike.

### gbfsClient.system()

- Returns a promise for a JSON object with system information. See the [GBFS system information spec](https://github.com/NABSA/gbfs/blob/master/gbfs.md#system_informationjson) for a list of the JSON fields.

### gbfsClient.stations()

- Returns a promise for a JSON object with station information for all stations. See the [GBFS station information spec](https://github.com/NABSA/gbfs/blob/master/gbfs.md#station_informationjson) for a list of the JSON fields.

### gbfsClient.stationStatus(_stationId_)

- `stationId`: optional id for a specific station. If this parameter is not provided, status for all stations will be returned.
- Returns a promise for a JSON object with station status for one or all stations. See the [GBFS station status spec](https://github.com/NABSA/gbfs/blob/master/gbfs.md#station_statusjson) for a list of the JSON fields.
