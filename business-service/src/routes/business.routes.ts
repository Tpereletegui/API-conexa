import { jwtMiddleware } from './../middlewares/jwtMiddleware';
import express, { NextFunction, Request, Response, Router } from 'express';
import { BusinessControlelr } from '../controllers/business.controller';
import { config } from '../config/config';

class BusinessRoutes {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	public routes(): Router {
		const businessController = new BusinessControlelr();
		this.router.get('/users', this.restrictAccess, jwtMiddleware(config.SECRET_KEY_ONE), businessController.listUsers.bind(businessController));

		return this.router;
	}

	private restrictAccess(req: Request, res: Response, next: NextFunction) {
		const allowedAppHeader = req.headers['x-allowed-app'];
		const allowedApp = config.ALLOWED_URL; 
	
		if (allowedAppHeader !== allowedApp) {
			return res.status(403).json({ error: 'Forbidden' });
		}
	
		next();
	  }
};

export const businessRoutes: BusinessRoutes = new BusinessRoutes();