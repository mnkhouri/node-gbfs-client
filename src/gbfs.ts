import * as httpClient from './http';
import {SystemInfo, StationInfo, StationStatus} from './types';

class GbfsClient {
  urls: {
    base: string,
    systemInfo: string,
    stationInfo: string,
    stationStatus: string
  };
  constructor(baseUrl: string | undefined) {
    baseUrl = baseUrl || 'https://gbfs.citibikenyc.com/gbfs/en/';
    this.urls = {
      base: baseUrl,
      systemInfo: baseUrl + 'system_information.json',
      stationInfo: baseUrl + 'station_information.json',
      stationStatus: baseUrl + 'station_status.json'
    };
  };

  system(): Promise<SystemInfo> {
    return httpClient.get(this.urls.systemInfo)
      .then((data) => {
        return JSON.parse(data)['data'];
      });
  };

  stationInfo (stationId: string): Promise<StationInfo[]>;
  stationInfo (): Promise<StationInfo>;
  stationInfo (stationId?: string): Promise<StationInfo | StationInfo[]> {
    return this.stations(this.urls.stationInfo, stationId);
  };

  stationStatus (stationId: string): Promise<StationStatus[]>;
  stationStatus (): Promise<StationStatus>;
  stationStatus (stationId?: string): Promise<StationStatus | StationStatus[]> {
    return this.stations(this.urls.stationStatus, stationId);
  };

  stations (url:string , stationId?: string): Promise<any> {
    return httpClient.get(url)
      .then((data) => {
        const stations = JSON.parse(data)['data']['stations'];
        if (stationId === undefined) {
          return stations;
        } else {
          for (let station of stations) {
            if (station.station_id === stationId) {
              return station;
            }
          }
          throw new Error(`Station ID ${stationId} not found`);
        }
      });
  };
}

module.exports = GbfsClient;
