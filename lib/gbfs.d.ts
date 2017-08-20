import { SystemInfo, StationInfo, StationStatus } from './types';
declare class GbfsClient {
    urls: {
        base: string;
        systemInfo: string;
        stationInfo: string;
        stationStatus: string;
    };
    constructor(baseUrl: string | undefined);
    system(): Promise<SystemInfo>;
    stationInfo(stationId: string): Promise<StationInfo[]>;
    stationInfo(): Promise<StationInfo>;
    stationStatus(stationId: string): Promise<StationStatus[]>;
    stationStatus(): Promise<StationStatus>;
    stations(url: string, stationId?: string): Promise<any>;
}
export = GbfsClient;
