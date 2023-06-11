import { IUser } from "../../models/user";
import { ILoginService } from "../../interfaces/services/LoginService";

export class MockLoginService implements ILoginService {
    public async registerUser(email: string, password: string): Promise<void> {
      return Promise.resolve();
    }
  
    public async login(email: string, password: string): Promise<string> {
      return Promise.resolve('mock-token');
    }
  
    public async listUsers(token: string): Promise<IUser[]> {
      return Promise.resolve([]);
    }
  }
  