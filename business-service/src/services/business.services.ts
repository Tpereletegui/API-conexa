import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { BusinessRepository as BusinessRepository, businessRepository as businessRepository } from '../repositories/business.repositories';
import { config } from '../config/config';
import { IUser } from '../models/user';

export class BusinessService {
  private readonly secretKey: string;
  private readonly businessRepository: BusinessRepository;

  constructor(secretKey: string, businessRepository: BusinessRepository) {
    this.secretKey = secretKey;
    this.businessRepository = businessRepository;
  }

  public async listUsers(page: number, perPage: number, email?: string | undefined): Promise<IUser[]> {
    try {
      const users = await this.businessRepository.getUsers(page, perPage, email);
      return users;
    } catch (error) {
      throw new Error('Error retrieving user list');
    }
  }

  public async getUserById(userId: string): Promise<IUser | null> {
    try {
      const user = await this.businessRepository.getUserById(userId);
      return user;
    } catch (error) {
      throw new Error('Error retrieving user');
    }
  }
}

export const businessService: BusinessService = new BusinessService(config.SECRET_KEY_ONE, businessRepository)