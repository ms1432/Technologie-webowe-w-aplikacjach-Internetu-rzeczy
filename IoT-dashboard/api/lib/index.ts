import Index from "./app";
import IndexController from "./controllers/index.controller";
import ItemController from './controllers/item.controller';
import DataController from './controllers/data.controller';
import ReadingController from "./controllers/reading.controller";

const app: Index = new Index([]);
const io = app.getIo();


const controllers = [
   new ReadingController(io),
   // new IndexController(io),
   // new ItemController(),
   new DataController()
]

controllers.forEach((controller) => {
   app.app.use("/", controller.router);
});


app.listen();