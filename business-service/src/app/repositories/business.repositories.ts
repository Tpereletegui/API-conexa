import { FilterQuery, Model } from 'mongoose';
import User, { IUser } from '../models/user';

export class BusinessRepository {
  private readonly userModel: Model<IUser>;

  constructor(userModel: Model<IUser>) {
    this.userModel = userModel;
  }

  public async getUsers(page: number, perPage: number, search?: string): Promise<IUser[]> {
    try {
      const query: FilterQuery<IUser> = {};
      if (search) {
        query.email = { $regex: search, $options: 'i' }; // Case-insensitive search
      }

      const users = await this.userModel
        .find(query)
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

      return users;
    } catch (error) {
      throw new Error('Error retrieving user list');
    }
  }

  public async getUserById(userId: string): Promise<IUser | null> {
    try {
      const user = await this.userModel.findById(userId).exec();
      return user;
    } catch (error) {
      throw new Error('Error retrieving user');
    }
  }
}

export const businessRepository: BusinessRepository = new BusinessRepository(User)