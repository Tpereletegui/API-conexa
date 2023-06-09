import { Model } from 'mongoose';
import user, { IUser } from '../models/user';

export class LoginRepository {
  private readonly userModel: Model<IUser>;

  constructor(userModel: Model<IUser>) {
    this.userModel = userModel;
  }

  public async getUserByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await this.userModel.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } }).exec();
      return user;
    } catch (error) {
      throw new Error('User already exists')
    }
  }

  public async addUser(email: string, password: string): Promise<IUser> {
    const newUser = new this.userModel({
      email,
      password,
    });

    return newUser.save();
  }

  public async getUsers(): Promise<IUser[]> {
    try {
      const users = await this.userModel.find().exec();
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

export const loginRepository: LoginRepository = new LoginRepository(user)