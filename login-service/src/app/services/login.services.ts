import jwt from 'jsonwebtoken';
import { LoginRepository, loginRepository } from '../repositories/login.repositories';
import { config } from '../../config/config';
import { IUser } from '../models/user';
import axios from 'axios';

export class LoginService {
  private readonly secretKey: string;
  private readonly loginRepository: LoginRepository;

  constructor(secretKey: string, loginRepository: LoginRepository) {
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

  public async listUsers(token: string): Promise<IUser[]> {
    try {
      const eventBusResponse = await axios.get(`${config.EVENT_BUS_URL}/users`, {
        headers: {
          Authorization: token
        }
      });

      const users = eventBusResponse.data.users
      return users;
      // return await this.loginRepository.getUsers()
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

export const loginService: LoginService = new LoginService(config.JWT_TOKEN, loginRepository)