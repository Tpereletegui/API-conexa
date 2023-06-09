import express from 'express';
import { getUsers } from '../controllers/users.controller';

export const usersRouter = express.Router();

usersRouter.get('/', getUsers);
