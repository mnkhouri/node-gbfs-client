const httpClient = require('./http');

function GbfsClient (baseUrl, options) {
  baseUrl = baseUrl || 'https://gbfs.citibikenyc.com/gbfs/en/';
  options = options || {};
  this.urls = {
    base: baseUrl,
    systemInfo: options.systemInfoUrl || baseUrl + 'system_information.json',
    stationInfo: options.stationInfoUrl || baseUrl + 'station_information.json',
    stationStatus: options.stationStatusUrl || baseUrl + 'station_status.json'
  };
}

GbfsClient.prototype.system = function() {
  return httpClient.get(this.urls.systemInfo)
    .then((data) => {
      return JSON.parse(data)['data'];
    });
};

GbfsClient.prototype.stations = function() {
  return httpClient.get(this.urls.stationInfo)
    .then((data) => {
      return JSON.parse(data)['data']['stations'];
    });
};

GbfsClient.prototype.stationStatus = function(stationId) {
  return httpClient.get(this.urls.stationStatus)
    .then((data) => {
      const stations = JSON.parse(data)['data']['stations'];
      if (stationId === undefined) {
        return stations;
      } else {
        for (var station of stations) {
          if (station.station_id === stationId) {
            return station;
          }
        }
        throw new Error(`Station ID ${stationId} not found`);
      }
    });
};

module.exports = GbfsClient;
