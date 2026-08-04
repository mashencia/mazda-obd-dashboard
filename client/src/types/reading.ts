export interface Reading{
    readingId: number;
    tripId: number;
    rpm: number;
    vehicleSpeed: number;
    ect: number;
    maf: number;
    mapKpa: number;
    throttlePosition: number;
    o2Sensor: number;
    fuelTrim: number;
    ignitionTimingAdvance: number;
    iat: number;
    timestamp: string;
}