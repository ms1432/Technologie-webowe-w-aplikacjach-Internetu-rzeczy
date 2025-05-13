import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';

class DataController implements Controller {
    public path = '/api/data';
    public router = Router();
    public testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];
 
    constructor() {
        this.initializeRoutes();
    }
 
    private initializeRoutes() {
        this.router.get(`${this.path}/latest`, this.getLatestReadingsFromAllDevices);
        this.router.post(`${this.path}/:id`, this.addData);
        this.router.get(`${this.path}/:id`, this.getDataById);
        this.router.get(`${this.path}/:id/latest`, this.getMaxData);
        this.router.get(`${this.path}/:id/:num`, this.getDataByRange);
        this.router.delete(`${this.path}/all`, this.deleteAllData);
        this.router.delete(`${this.path}/:id`, this.deleteDataById);
    }
 
     private getLatestReadingsFromAllDevices = async (request: Request, response: Response, next: NextFunction) => {
        try {
            response.status(200).json(this.testArr);
        }catch (error) {
            response.status(500).json({ error: error.message });
        }
     }

     private addData = async (request: Request, response: Response, next: NextFunction) => {
        try {
            var data = parseInt(request.params.id);
            this.testArr.push(data);
            response.status(200).json(this.testArr);
        }catch (error) {
            response.status(500).json({ error: error.message });
        }
     }
     private getDataById = async (request: Request, response: Response, next: NextFunction) => {
        try{
            var data = parseInt(request.params.id);
            response.status(200).json(this.testArr[data]);
        }catch (error) {
            response.status(500).json({ error: error.message });
        }
     }
     private getMaxData = async (request: Request, response: Response, next: NextFunction) => {
        try{
            var data = parseInt(request.params.id);
            var max = Math.max(...this.testArr);
            response.status(200).json(max);
        }catch (error) {
            response.status(500).json({ error: error.message });
        }   
     }
     private getDataByRange = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const rangeStart = parseInt(request.params.id);
            const rangeEnd = parseInt(request.params.num);
            response.status(200).json(this.testArr.slice(rangeStart, rangeEnd));
        }catch (error) {
            response.status(500).json({ error: error.message });
        }
    }
    private deleteAllData = async (request: Request, response: Response, next: NextFunction) => {
        try{
            this.testArr = [];
            response.status(200).json(this.testArr);
        }catch (error) {
            response.status(500).json({ error: error.message });
        }
    }
    private deleteDataById = async (request: Request, response: Response, next: NextFunction) => {
        try {
            var data = parseInt(request.params.id);
            this.testArr.splice(data, 1);
            response.status(200).json(this.testArr);
        }catch (error) {
            response.status(500).json({ error: error.message });
        }
    }
 }
 
 export default DataController;
 