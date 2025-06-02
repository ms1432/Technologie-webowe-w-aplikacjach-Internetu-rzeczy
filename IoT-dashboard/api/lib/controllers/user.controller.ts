import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import { auth } from '../middlewares/auth.middleware';
import { admin } from '../middlewares/admin.middleware';
import UserService from "../modules/services/user.service";
import PasswordService from "../modules/services/password.service";
import TokenService from "../modules/services/token.service";
import EmailService from '../modules/services/email.service';


class UserController implements Controller {
    public path = '/api/user';
    public router = Router();

    constructor(private userService: UserService, private passwordService: PasswordService, private tokenService: TokenService, private emailService: EmailService) {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/create`, this.createNewOrUpdate);
        this.router.post(`${this.path}/auth`, this.authenticate);
        this.router.delete(`${this.path}/logout/:userId`, auth, this.removeHashSession);
        this.router.post(`${this.path}/resetPasswd`, this.resetPasswd);
        this.router.post(`${this.path}/deleteUser/:userId`, admin, this.deleteUser);
    }

    private authenticate = async (request: Request, response: Response, next: NextFunction) => {
        const { login, password } = request.body;


        try {
            const user = await this.userService.getByEmailOrName(login);
            if (!user) {
                return response.status(401).json({ error: 'Unauthorized' });
            }

            const isAuthorized = await this.passwordService.authorize(user._id, password);
            if (!isAuthorized) {
                return response.status(401).json({ error: 'Unauthorized' });
            }

            const token = await this.tokenService.create(user);
            response.status(200).json(this.tokenService.getToken(token));
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(401).json({ error: 'Unauthorized' });
        }
    };


    private createNewOrUpdate = async (request: Request, response: Response, next: NextFunction) => {
        const userData = request.body;
        try {
            const user = await this.userService.createNewOrUpdate(userData);
            if (userData.password) {
                const hashedPassword = await this.passwordService.hashPassword(userData.password)
                await this.passwordService.createOrUpdate({
                    userId: user._id,
                    password: hashedPassword
                });
            }
            response.status(200).json(user);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({ error: 'Bad request', value: error.message });
        }

    };

    private removeHashSession = async (request: Request, response: Response, next: NextFunction) => {
        const { userId } = request.params
        try {
            const result = await this.tokenService.remove(userId);
            response.status(200).send(result);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(401).json({ error: 'Unauthorized' });
        }
    };

    private resetPasswd = async (request: Request, response: Response, next: NextFunction) => {
        const { email, password } = request.body;

        try {
            const hashedPassword = await this.passwordService.hashPassword(password);
            const user = await this.userService.getByEmailOrName(email);
            if (!user) {
                response.status(404).json({ error: 'User not found' });
                return;
            }
            await this.passwordService.createOrUpdate({
                userId: user._id,
                password: hashedPassword
            });
            await this.emailService.sendEmail(email, 'Password Reset', `New password ${password}`);
            response.status(200).json({ message: 'Password reset successfully' });
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({ error: 'Bad request', value: error.message });
        }
    };
    private deleteUser = async (request: Request, response: Response, next: NextFunction) => {
        const { userId } = request.params;
        try {
            const result = await this.userService.deleteById(userId);
            if (!result) {
                response.status(404).json({ error: 'User not found' });
                return;
            }
            response.status(200).json("User deleted successfully");
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({ error: 'Bad request', value: error.message });
        }
    };
}

export default UserController;