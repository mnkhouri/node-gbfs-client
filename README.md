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
    /* { system_id: 'NYC',
          language: 'en',
          name: 'Citi Bike',
          ... */

gbfsClient.stationInfo()
    .then(stations => console.log(stations));
    /* [ { station_id: '72',
            name: 'W 52 St & 11 Ave',
            short_name: '6926.01',
            lat: 40.76727216,
            lon: -73.99392888,
            ...
        ] */
gbfsClient.stationInfo('72')
    .then(stationInfo => console.log(stationInfo));
    /* { station_id: '72',
            name: 'W 52 St & 11 Ave',
            short_name: '6926.01',
            lat: 40.76727216,
            lon: -73.99392888,
            ... */

gbfsClient.stationStatus('72')
    .then(stationStatus => console.log(stationStatus));
    /*  { station_id: '72',
            num_bikes_available: 12,
            num_docks_available: 26,
            ... */
```

### new GbfsClient(_baseUrl_)

- `baseUrl`: optional url for the GBFS API. Defaults to `'https://gbfs.citibikenyc.com/gbfs/en/'`, for NYC's CitiBike.

### gbfsClient.system()

- Returns a promise for a JSON object with system information. See the [GBFS system information spec](https://github.com/NABSA/gbfs/blob/master/gbfs.md#system_informationjson) for a list of the JSON fields.

### gbfsClient.stationInfo()

- `stationId`: optional id for a specific station. If this parameter is not provided, an array of info for all stations will be returned.
- Returns a promise for a JSON object with station information for one or all stations. See the [GBFS station information spec](https://github.com/NABSA/gbfs/blob/master/gbfs.md#station_informationjson) for a list of the JSON fields.

### gbfsClient.stationStatus(_stationId_)

- `stationId`: optional id for a specific station. If this parameter is not provided, an array of status for all stations will be returned.
- Returns a promise for a JSON object with station status for one or all stations. See the [GBFS station status spec](https://github.com/NABSA/gbfs/blob/master/gbfs.md#station_statusjson) for a list of the JSON fields.
