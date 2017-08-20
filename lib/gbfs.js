"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpClient = require("./http");
class GbfsClient {
    constructor(baseUrl) {
        baseUrl = baseUrl || 'https://gbfs.citibikenyc.com/gbfs/en/';
        this.urls = {
            base: baseUrl,
            systemInfo: baseUrl + 'system_information.json',
            stationInfo: baseUrl + 'station_information.json',
            stationStatus: baseUrl + 'station_status.json'
        };
    }
    ;
    system() {
        return httpClient.get(this.urls.systemInfo)
            .then((data) => {
            return JSON.parse(data)['data'];
        });
    }
    ;
    stationInfo(stationId) {
        return this.stations(this.urls.stationInfo, stationId);
    }
    ;
    stationStatus(stationId) {
        return this.stations(this.urls.stationStatus, stationId);
    }
    ;
    stations(url, stationId) {
        return httpClient.get(url)
            .then((data) => {
            const stations = JSON.parse(data)['data']['stations'];
            if (stationId === undefined) {
                return stations;
            }
            else {
                for (let station of stations) {
                    if (station.station_id === stationId) {
                        return station;
                    }
                }
                throw new Error(`Station ID ${stationId} not found`);
            }
        });
    }
    ;
}
module.exports = GbfsClient;
