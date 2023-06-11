import { jwtMiddleware } from '../middlewares/jwtMiddleware';
import express, { Router } from 'express';
import { LoginController } from '../controllers/login.controller';
import { config } from '../config/config';
import { loginService } from '../services/login.services';

class LoginRoutes {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		const loginController = new LoginController(loginService);
		this.router.post('/signup', loginController.registerUser.bind(loginController));
		this.router.get('/login', loginController.loginUser.bind(loginController));
		this.router.get('/users', jwtMiddleware(config.SECRET_KEY_ONE), loginController.listUsers.bind(loginController));

		return this.router;
	}
};

export const loginRoutes: LoginRoutes = new LoginRoutes();