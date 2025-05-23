import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import { checkIdParam } from '../middlewares/deviceIdParam.middleware';
import DataService from '../modules/services/data.service';
import { IData } from 'modules/models/data.model';
import { config } from '../config'

class DataController implements Controller {
    public path = '/api/data';
    public router = Router();
    private dataService = new DataService();
    public testArr = [4, 5, 6, 3, 5, 3, 7, 5, 13, 5, 6, 4, 3, 6, 3, 6];

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/latest`, this.getLatestReadingsFromAllDevices);
        this.router.post(`${this.path}/:id`, checkIdParam, this.addData);
        this.router.get(`${this.path}/:id`, checkIdParam, this.getAllDeviceData);
        this.router.get(`${this.path}/:id/latest`, checkIdParam, this.getPeriodData);
        this.router.get(`${this.path}/:id/:num`, checkIdParam, this.getPeriodData);
        this.router.delete(`${this.path}/all`, this.cleanAllDevices);
        this.router.delete(`${this.path}/:id`, checkIdParam, this.cleanDeviceData);
    }

    private getLatestReadingsFromAllDevices = async (request: Request, response: Response, next: NextFunction) => {
        try {
            response.status(200).json(await this.dataService.getAllNewest());
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    }

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const { air } = request.body;
        const { id } = request.params;

        const data: IData = {
            temperature: air[0].value,
            pressure: air[1].value,
            humidity: air[2].value,
            deviceId: parseInt(id),
            readingDate: new Date
        }

        try {

            await this.dataService.createData(data);
            response.status(200).json(data);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({ error: 'Invalid input data.' });
        }
    };

    private getAllDeviceData = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const allData = await this.dataService.query(id);
        response.status(200).json(allData);
    };


    private getPeriodData = async (request: Request, response: Response, next: NextFunction) => {
        const id = parseInt(request.params.id);
        const num = request.params.num === undefined ? id : parseInt(request.params.num);
        const data: any = [];
        try {
            for (let i = id; i <= num; i++) {
                const temp = await this.dataService.get(i.toString());
                data.push(temp);
            }
            response.status(200).json(data)
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    }

    private cleanAllDevices = async (request: Request, response: Response, next: NextFunction) => {
        try {
            for (let i = 0; i < config.supportedDevicesNum; i++) {
                await this.dataService.deleteData(i.toString());
            }
            response.status(200).json("Usunieto");
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    }

    private cleanDeviceData = async (request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        try {
            await this.dataService.deleteData(id);
            response.status(200).json("Usunieto");
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    }
}

export default DataController;
