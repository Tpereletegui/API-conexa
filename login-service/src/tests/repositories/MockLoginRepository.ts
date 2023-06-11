import { Model } from "mongoose";
import { ILoginRepository } from "../../interfaces/repositories/LoginRepository";
import { IUser } from "../../models/user";

export class MockLoginRepository implements ILoginRepository{
  private users: IUser[];
  private readonly userModel: Model<IUser>;

  constructor(userModel: Model<IUser>) {
    this.users = [];
    this.userModel = userModel;
  }
  setUsers(users: IUser[]): void {
    this.users = [...this.users, ...users]
  }

  public async getUserByEmail(email: string): Promise<IUser | null> {
    const user = this.users.find((u) => u.email === email);
    return user || null;
  }

  public async addUser(email: string, password: string): Promise<IUser> {
    const user = { email, password } as IUser;
    this.users.push(user);
    return user;
  }

  public async getUsers(): Promise<IUser[]> {
    return this.users;
  }

  public async getUserById(userId: string): Promise<IUser | null> {
    const user = this.users.find((u) => u.id === userId);
    return user || null;
  }
}
