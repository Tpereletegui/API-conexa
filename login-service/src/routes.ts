
import { Application } from 'express';
import { loginRoutes } from './routes/login.routes';

const BASE_PATH = '/api/v1';

export default (app: Application) => {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const routes = () => {
		app.use(BASE_PATH, loginRoutes.routes());
	};
	routes();
};