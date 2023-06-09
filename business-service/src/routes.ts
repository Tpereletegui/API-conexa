
import { Application } from 'express';
import { businessRoutes } from './routes/business.routes';

const BASE_PATH = '/api/v1';

export default (app: Application) => {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const routes = () => {
		app.use(BASE_PATH, businessRoutes.routes());
	};
	routes();
};