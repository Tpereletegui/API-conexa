import { loginService } from '../app/services/login.services';
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
      const decodedToken = jwt.verify(token, secretKey, {algorithms: ['HS256']}) as JwtPayload;
      const user =  await loginService.getUserById(decodedToken.userId);
      req.user = user ?? null
      next();
    } catch (error) {
      console.error(" token verification error: ", error)
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
};