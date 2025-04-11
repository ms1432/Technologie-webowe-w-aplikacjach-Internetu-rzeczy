import Controller from '../interfaces/controller.interface';
import {Request, Response, NextFunction, Router} from 'express';
import path from 'path';
import { Server, Socket } from "socket.io";
import { IData } from '../modules/models/data.model';

class IndexController implements Controller {
   public path = '/*';
   public router = Router();
   private io: Server;
   public testData: IData = {
        temperature: 22.5,
        pressure: 1005,
        humidity: 55,
        deviceId: 1,
   }

   constructor(io: Server) {
       this.initializeRoutes();
       this.io = io;
   }

   private initializeRoutes() {
       this.router.get(this.path + 'emit', this.emitReading);
       this.router.get(this.path + 'test_data', this.emitTestData);
       this.router.get(this.path, this.serveIndex);
   }

   private serveIndex = async (request: Request, response: Response) => {
       response.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
   }

   private emitReading = async (request: Request, response: Response, next: NextFunction) => {
    try {
        this.io.emit("message", "data");
        response.status(200).json({ res: "ok" });
    } catch (error) {
        console.error("Błąd podczas emisji danych:", error);
        response.status(500).json({ error: "Błąd serwera" });
    }
 };

    private emitTestData = async (request: Request, response: Response, next: NextFunction) => {
    try {
        setInterval(() =>
            this.io.emit("message", `temperatura: ${this.testData.temperature}, ciśnienie: ${this.testData.pressure}, wilgotność: ${this.testData.humidity}`), 10000
           );
    } catch (error) {
        console.error("Błąd podczas emisji danych:", error);
        response.status(500).json({ error: "Błąd serwera" });
    }
 };
}

export default IndexController;