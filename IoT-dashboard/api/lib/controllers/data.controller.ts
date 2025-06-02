import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import { checkIdParam } from '../middlewares/deviceIdParam.middleware';
import DataService from '../modules/services/data.service';
import { IData } from 'modules/models/data.model';
import { config } from '../config'
import Joi from 'joi';

class DataController implements Controller {
    public path = '/api/data';
    public router = Router();

    constructor(private dataService: DataService) {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/latest`, this.getLatestReadingsFromAllDevices);
        this.router.post(`${this.path}/:id`, checkIdParam, this.addData);
        this.router.get(`${this.path}/:id/:num`, checkIdParam, this.getPeriodData);
        this.router.get(`${this.path}/:id`, checkIdParam, this.getAllDeviceData);
        this.router.get(`${this.path}/:id/latest`, checkIdParam, this.getPeriodData);
        this.router.delete(`${this.path}/all`, this.cleanAllDevices);
        this.router.delete(`${this.path}/:id`, checkIdParam, this.cleanDeviceData);
    }

    private getLatestReadingsFromAllDevices = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const data = await this.dataService.getAllNewest();
            response.status(200).json(data);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    }

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const { air } = request.body;
        const { id } = request.params;
        
        const schema = Joi.object({
            air: Joi.array()
                .items(
                    Joi.object({
                        id: Joi.number().integer().positive().required(),
                        value: Joi.number().positive().required()
                    })
                )
                .unique((a, b) => a.id === b.id),
            deviceId: Joi.number().integer().positive().valid(parseInt(id, 10)).required()
        });

        try {
            const validatedData = await schema.validateAsync({ air, deviceId: parseInt(id, 10) });
            const readingData: IData = {
                temperature: validatedData.air[0].value,
                pressure: validatedData.air[1].value,
                humidity: validatedData.air[2].value,
                deviceId: validatedData.deviceId,
            };
            await this.dataService.createData(readingData);
            response.status(200).json(readingData);
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
    const { id, num } = request.params;
    try {
        const data = await this.dataService.query(id);
        const n = Number(num);
        if (!num || isNaN(n) || n <= 0) {
            return response.status(200).json(data);
        } else {
            return response.status(200).json(data.slice(-n));
        }
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
