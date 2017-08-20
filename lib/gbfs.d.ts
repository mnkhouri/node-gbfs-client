import { StationInfo, StationStatus, SystemInfo } from './types';
declare class GbfsClient {
    private urls;
    constructor(baseUrl?: string);
    system(): Promise<SystemInfo>;
    stationInfo(stationId: string): Promise<StationInfo[]>;
    stationInfo(): Promise<StationInfo>;
    stationStatus(stationId: string): Promise<StationStatus[]>;
    stationStatus(): Promise<StationStatus>;
    private stations(url, stationId?);
}
export = GbfsClient;
