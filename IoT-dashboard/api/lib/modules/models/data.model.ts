export interface IData {
    temperature: Number;
    pressure: Number;
    humidity: Number;
    deviceId: Number;
    readingDate?: Date;
}


export type Query<T> = {
    [key: string]: T;
};
