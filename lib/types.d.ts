export interface SystemInfo {
    system_id: string;
    language: string;
    name: string;
    short_name?: string;
    operator?: string;
    url?: string;
    purchase_url?: string;
    start_date?: string;
    phone_number?: string;
    email?: string;
    timezone: string;
    license_url?: string;
}
export interface StationInfo {
    station_id: string;
    name: string;
    short_name?: string;
    lat: number;
    lon: number;
    address?: string;
    cross_street?: string;
    region_id?: number;
    post_code?: string;
    rental_methods: any[];
    capacity?: number;
}
export interface StationStatus {
    station_id: string;
    num_bikes_available: number;
    num_bikes_disabled?: number;
    num_docks_available: number;
    num_docks_disabled?: number;
    is_installed: number;
    is_renting: number;
    is_returning: number;
    last_reported: number;
}
