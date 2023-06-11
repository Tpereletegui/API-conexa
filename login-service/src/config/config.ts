import dotenv from 'dotenv';
import bunyan from 'bunyan';

dotenv.config({});

class Config {
	public DATABASE_URL: string | undefined;
	public JWT_TOKEN: string;
	public NODE_ENV: string | undefined;
	public SECRET_KEY_ONE: string;
	public SECRET_KEY_TWO: string;
	public EVENT_BUS_URL: string | undefined;

	private readonly DEFAULT_DATABASE_URL = 'mongodb://localhost:27017/API';

	constructor() {
		this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
		this.JWT_TOKEN = process.env.JWT_TOKEN || '1234';
		this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || 'secretkeyONE';
		this.SECRET_KEY_TWO = process.env.SECRET_KEY_ONE || 'secretkeyTWO';
		this.EVENT_BUS_URL = process.env.EVENT_BUS_URL || 'http://localhost:4000';
	}

	public createLogger(name: string): bunyan {
		return bunyan.createLogger({ name, level: 'debug' });
	}

	public validateConfig(): void {
		for (const [key, value] of Object.entries(this)) {
			if (value === undefined) {
				throw new Error(`Configuration ${key} is undefined`);
			}
		}
	}
}

export const config: Config = new Config();