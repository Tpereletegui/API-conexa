import { IUser } from "../../models/user";

export interface ILoginService {
    registerUser(email: string, password: string): Promise<void>;
    login(email: string, password: string): Promise<string>;
    listUsers(token: string, page: string, email?: string | undefined): Promise<IUser[]>;
  }