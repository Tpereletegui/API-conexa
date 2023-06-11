import { BusinessService as BusinessService, businessService } from '../services/business.services';
import { Request, Response } from 'express';
import { config } from '../../config/config';
import { BusinessRepository as BusinessRepository } from '../repositories/business.repositories'
import User from '../models/user';


export class BusinessControlelr {
  private businessService: BusinessService;

  constructor() {
    this.businessService = new BusinessService(config.SECRET_KEY_ONE, new BusinessRepository(User));
  }

  public async listUsers(req: Request, res: Response): Promise<void> {
    try {
      const page = req.query.page;
      const email = req.query.email as string;
      const parsedPage = parseInt(page as string, 10)
      const perPage = 10
      const users = await this.businessService.listUsers(parsedPage, perPage, email);
      res.status(200).json({ users });
    } catch (error) {
      console.error('Error retrieving user list:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
