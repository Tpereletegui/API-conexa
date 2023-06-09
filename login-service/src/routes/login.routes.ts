import { jwtMiddleware } from '../middlewares/jwtMiddleware';
import express, { Router } from 'express';
import { LoginController } from '../app/controllers/login.controller';
import { config } from '../config/config';

class LoginRoutes {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		const loginController = new LoginController();
		this.router.post('/signup', loginController.registerUser.bind(loginController));
		this.router.get('/login', loginController.loginUser.bind(loginController));
		this.router.get('/users', jwtMiddleware(config.JWT_TOKEN), loginController.listUsers.bind(loginController));

		return this.router;
	}
};

export const loginRoutes: LoginRoutes = new LoginRoutes();