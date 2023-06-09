import { jwtMiddleware } from './../middlewares/jwtMiddleware';
import express, { Router } from 'express';
import { BusinessControlelr } from '../app/controllers/business.controller';
import { config } from '../config/config';

class BusinessRoutes {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		const businessController = new BusinessControlelr();
		this.router.get('/users', jwtMiddleware(config.JWT_TOKEN), businessController.listUsers.bind(businessController));

		return this.router;
	}
};

export const businessRoutes: BusinessRoutes = new BusinessRoutes();