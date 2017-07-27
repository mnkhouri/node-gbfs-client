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

GbfsClient.prototype.stationInfo = function(stationId) {
  return this.stations(this.urls.stationInfo, stationId);
};

GbfsClient.prototype.stationStatus = function(stationId) {
  return this.stations(this.urls.stationStatus, stationId);
};

GbfsClient.prototype.stations = function(url, stationId) {
  return httpClient.get(url)
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
