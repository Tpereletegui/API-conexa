import { IUser } from "../../models/user";

export interface ILoginRepository {
  getUserByEmail(email: string): Promise<IUser | null>;
  addUser(email: string, password: string): Promise<IUser>;
  getUsers(): Promise<IUser[]>;
  getUserById(userId: string): Promise<IUser | null>;
  setUsers(users: IUser[]): void
}