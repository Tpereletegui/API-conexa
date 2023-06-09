import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { usersRouter } from './routes/users.routes';

dotenv.config();

const app: Application = express();
const port: number = 4000;

app.use(express.json());

app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Event Bus server running on port ${port}`);
});