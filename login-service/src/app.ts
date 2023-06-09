import { APIServer } from './server';
import express, { Express } from 'express';
import databaseConnection from './database';
import { config } from './config/config';

class Application {
	public initialize(): void {
		this.loadConfig();
		databaseConnection();
		const app: Express = express();
		const server: APIServer = new APIServer(app);
		server.start();
	}

	private loadConfig(): void {
		config.validateConfig();
	}
}

const application: Application = new Application();
application.initialize();