import { jwtMiddleware } from './../middlewares/jwtMiddleware';
import express, { Router } from 'express';
import { BusinessControlelr } from '../controllers/business.controller';
import { config } from '../config/config';

class BusinessRoutes {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		const businessController = new BusinessControlelr();
		this.router.get('/users', jwtMiddleware(config.SECRET_KEY_ONE), businessController.listUsers.bind(businessController));

		return this.router;
	}
};

export const businessRoutes: BusinessRoutes = new BusinessRoutes();