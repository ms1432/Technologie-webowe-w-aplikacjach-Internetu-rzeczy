export const MAX_DEVICES = 17;

export type ChartData = {
    tData: number[];
    hData: number[];
    pData: number[];
    xLabels: string[];
    dataId?: string[];
};

export type DeviceData = {
    deviceId?: number;
    temperature?: number;
    humidity?: number;
    pressure?: number;
};

export type ParsedData = {
    tData: number;
    hData: number;
    pData: number;
    xLabels: string;
    dataId?: string;
}[] | null;