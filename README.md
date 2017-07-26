# Node GBFS Client

Lightweight client for General Bikeshare Feed Specification (GBFS) feeds, compatible with the Citibike NYC API.

## Installation

```
npm install gbfs-client --save
```

# Methods

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
