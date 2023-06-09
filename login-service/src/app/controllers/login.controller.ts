import { LoginService, loginService } from './../services/login.services';
import { Request, Response } from 'express';


export class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = loginService;
  }

  public async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await this.loginService.registerUser(email, password);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.loginService.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async listUsers(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization!!
      const users = await this.loginService.listUsers(token);
      res.status(200).json(users);
    } catch (error) {
      console.error('Error listing users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
