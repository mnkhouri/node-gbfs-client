import * as httpClient from './http';
import {StationInfo, StationStatus, SystemInfo} from './types';

class GbfsClient {
  private urls: {
    base: string,
    systemInfo: string,
    stationInfo: string,
    stationStatus: string,
  };
  constructor(baseUrl?: string) {
    baseUrl = baseUrl || 'https://gbfs.citibikenyc.com/gbfs/en/';
    this.urls = {
      base: baseUrl,
      stationInfo: baseUrl + 'station_information.json',
      stationStatus: baseUrl + 'station_status.json',
      systemInfo: baseUrl + 'system_information.json',
    };
  }

  public system(): Promise<SystemInfo> {
    return httpClient.get(this.urls.systemInfo)
      .then((data) => {
        return JSON.parse(data).data;
      });
  }

  public stationInfo(stationId: string): Promise<StationInfo>;
  public stationInfo(): Promise<StationInfo[]>;
  public stationInfo(stationId?: string): Promise<StationInfo | StationInfo[]> {
    return this.stations(this.urls.stationInfo, stationId);
  }

  public stationStatus(stationId: string): Promise<StationStatus>;
  public stationStatus(): Promise<StationStatus[]>;
  public stationStatus(stationId?: string): Promise<StationStatus | StationStatus[]> {
    return this.stations(this.urls.stationStatus, stationId);
  }

  private stations(url: string , stationId?: string): Promise<any> {
    return httpClient.get(url)
      .then((data) => {
        const stations = JSON.parse(data).data.stations;
        if (stationId === undefined) {
          return stations;
        } else {
          for (const station of stations) {
            if (station.station_id === stationId) {
              return station;
            }
          }
          throw new Error(`Station ID ${stationId} not found`);
        }
      });
  }
}

export = GbfsClient;
