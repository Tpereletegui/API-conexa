import mongoose from 'mongoose';
import { config } from './config/config';
import Logger from 'bunyan';

const log: Logger = config.createLogger('setupDatabase');

export default () => {
	const connect = () => {
		mongoose
			.connect(`${config.DATABASE_URL}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
			.then(() => {
				log.info('successfully connected to database.');
			})
			.catch((error) => {
				log.error('Error connecting to database', error);
				return process.exit(1);
			});
	};
	connect();
	mongoose.connection.on('disconnected', connect);
};