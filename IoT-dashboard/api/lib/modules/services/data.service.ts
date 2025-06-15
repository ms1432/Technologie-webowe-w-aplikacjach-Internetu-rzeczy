import DataModel from '../schemas/data.schema';
import { IData, Query } from "../models/data.model";
import { config } from '../../config';

export default class DataService {

    public async createData(dataParams: IData) {
        try {
            const dataModel = new DataModel(dataParams);
            await dataModel.save();
        } catch (error) {
            console.error('Wystąpił błąd podczas tworzenia danych:', error);
            throw new Error('Wystąpił błąd podczas tworzenia danych');
        }
    }

    public async query(deviceID: string) {
        try {
            const data = await DataModel.find({ deviceId: deviceID }, { __v: 0, _id: 0 })
            .sort( { readingDate: -1 });
            return data;
        } catch (error) {
            throw new Error(`Query failed: ${error}`);
        }
    }
    public async getAllNewest(): Promise<object[]> {
        const latestData: object[] = [];

        await Promise.all(
            Array.from({ length: config.supportedDevicesNum }, async (_, i) => {
                try {
                    const [latestEntry] = await DataModel.find(
                        { deviceId: i },
                        { __v: 0, _id: 0 }
                    )
                        .sort({ readingDate: -1 })
                        .limit(1);
                    latestData.push(latestEntry || { deviceId: i });
                } catch (error: any) {
                    console.error(`Błąd podczas pobierania danych dla urządzenia ${i}: ${error.message}`);
                    latestData.push({ deviceId: i, error: "Błąd pobierania danych" });
                }
            })
        );

        return latestData;
    }

    public async get(deviceID: string) {
        try {
            const data = await DataModel.findOne(
                { deviceId: deviceID },
                { __v: 0, _id: 0 }
            ).sort({ readingDate: -1 });
            return data;
        } catch (error) {
            throw new Error(`Query failed: ${error}`);
        }
    }

    public async deleteData(deviceID: string) {
        try {
            const data = await DataModel.deleteMany({ deviceId: deviceID });
            return data;
        } catch (error) {
            throw new Error(`Query failed: ${error}`);
        }
    }
}

