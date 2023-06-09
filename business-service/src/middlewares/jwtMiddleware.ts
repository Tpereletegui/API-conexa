import { businessService } from './../app/services/business.services';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../app/models/user';

interface CustomRequest extends Request {
    user?: IUser | null; // Define the 'user' property with the appropriate type
  }

export const jwtMiddleware = (secretKey: string) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const decodedToken = jwt.verify(token, secretKey) as JwtPayload;
      const user =  await businessService.getUserById(decodedToken.userId);
      req.user = user ?? null
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
};