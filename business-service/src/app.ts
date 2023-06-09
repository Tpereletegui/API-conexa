import { BusinessServer } from './server';
import express, { Express } from 'express';
import databaseConnection from './database';
import { config } from './config/config';

class Application {
	public initialize(): void {
		this.loadConfig();
		databaseConnection();
		const app: Express = express();
		const server: BusinessServer = new BusinessServer(app);
		server.start();
	}

	private loadConfig(): void {
		config.validateConfig();
	}
}

const application: Application = new Application();
application.initialize();