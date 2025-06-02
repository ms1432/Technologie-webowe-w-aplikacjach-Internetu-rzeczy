import DataController from './controllers/data.controller';
import App from './app';
import IndexController from "./controllers/index.controller";
import UserController from './controllers/user.controller';
import DataService from './modules/services/data.service';
import EmailService from './modules/services/email.service';
import PasswordService from './modules/services/password.service';
import TokenService from './modules/services/token.service';
import UserService from './modules/services/user.service';

const dataService = new DataService();
const emailService = new EmailService();
const passwordService = new PasswordService();
const tokenService = new TokenService();
const userService = new UserService();

const app: App = new App([
   new UserController(userService, passwordService, tokenService, emailService),
   new DataController(dataService),
   new IndexController()
]);

app.listen();