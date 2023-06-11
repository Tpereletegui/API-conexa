import jwt from 'jsonwebtoken';
import { MongoLoginRepository, mongoLoginRepository } from '../repositories/MongoLoginRepository';
import { config } from '../config/config';
import { IUser } from '../models/user';
import axios from 'axios';
import { ILoginService } from '../interfaces/services/LoginService';
import { ILoginRepository } from '../interfaces/repositories/LoginRepository'

export class LoginService implements ILoginService {
  private readonly secretKey: string;
  private readonly loginRepository: ILoginRepository;

  constructor(secretKey: string, loginRepository: ILoginRepository) {
    this.secretKey = secretKey;
    this.loginRepository = loginRepository;
  }

  public async registerUser(email: string, password: string): Promise<void> {
    const existingUser = await this.loginRepository.getUserByEmail(email);

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    await this.loginRepository.addUser(email, password);
  }

  public async login(email: string, password: string): Promise<string> {
    const user = await this.loginRepository.getUserByEmail(email);

    if (!user || !(await this.validateUserCredentials(password, user.password))) {
      throw new Error('Invalid email or password');
    }

    const token = this.generateToken(user.id);
    return token;
  }

  public async listUsers(token: string, page: string, email?: string): Promise<IUser[]> {
    try {
      const emailParam = email != null && email != '' ? `&email=${email}` : ''
      const queryParams = `?page=${page}${emailParam}`
      const eventBusResponse = await axios.get(`${config.EVENT_BUS_URL}/users${queryParams}`, {
        headers: {
          Authorization: token
        }
      });

      const users = eventBusResponse.data.users
      return users;
    } catch (error) {
      console.error(error)
      throw new Error('Error retrieving user list');
    }
  }

  public async getUserById(userId: string): Promise<IUser | null> {
    try {
      const user = await this.loginRepository.getUserById(userId);
      return user;
    } catch (error) {
      throw new Error('Error retrieving user');
    }
  }

  private async validateUserCredentials(password: string, storedPassword: string): Promise<boolean> {
    return password == storedPassword;
  }

  private generateToken(userId: string): string {
    console.log('logintoken', this.secretKey)
    const token = jwt.sign({ userId }, this.secretKey, { expiresIn: '1h', algorithm: 'HS256'});
    return token;
  }
}

interface UserData {
  users: IUser[];
}

export const loginService: LoginService = new LoginService(config.SECRET_KEY_ONE, mongoLoginRepository)