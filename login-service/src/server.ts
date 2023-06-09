import { Application, json, urlencoded} from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import cookieSession from 'cookie-session';
import compression from 'compression';
import { config } from './config/config';
import applicationRoutes from './routes';
import Logger from 'bunyan';

const SERVER_PORT = 8000;
const log: Logger = config.createLogger('server');

export class APIServer {
	private app: Application;

	constructor(app: Application) {
		this.app = app;
	}

	public start(): void {
		this.securityMiddleware(this.app);
		this.standardMiddleware(this.app);
		this.routesMiddleware(this.app);
		this.startServer(this.app);
	}

	private securityMiddleware(app: Application): void {
		app.use(
			cookieSession({
				name: 'session',
				keys: [config.SECRET_KEY_ONE!, config.SECRET_KEY_TWO!],
				maxAge: 24 * 7 * 3600000
			})
		);
		app.use(hpp());
		app.use(helmet());
		app.use(
			cors({
				origin: '*',
				credentials: true,
				optionsSuccessStatus: 200,
				methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
			})
		);
	}

	private standardMiddleware(app: Application): void {
		app.use(compression());
		app.use(json({ limit: '50mb' }));
		app.use(urlencoded({ extended: true, limit: '50mb' }));
	}

	private routesMiddleware(app: Application): void {
		applicationRoutes(app);
	}

	private async startServer(app: Application): Promise<void> {
		try {
			const httpServer: http.Server = new http.Server(app);
			this.startHttpServer(httpServer);
		} catch (error) {
			log.error(error);
		}
	}

	private startHttpServer(httpServer: http.Server): void {
		httpServer.listen(SERVER_PORT, () => {
			log.info(`Server running on port ${SERVER_PORT}`);
		});
  }

}