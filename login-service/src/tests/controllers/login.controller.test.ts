import { ILoginService } from "../../interfaces/services/LoginService";
import { LoginController } from "../../controllers/login.controller";
import { MockLoginService } from "../services/MockLoginService";
import { Request, Response } from 'express';


describe('LoginController', () => {
  let loginController: LoginController;
  let mockLoginService: ILoginService;

  beforeEach(() => {
    mockLoginService = new MockLoginService(); // You can provide a mock implementation for LoginService if needed
    loginController = new LoginController(mockLoginService);
  });

  describe('registerUser', () => {
    it('should register a new user and return 201 status code', async () => {
      const mockReq = { body: { email: 'test@example.com', password: 'password123' } } as Request;
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      await loginController.registerUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'User registered successfully' });
    });

    it('should handle errors and return 500 status code', async () => {
      const mockReq = { body: { email: 'test@example.com', password: 'password123' } } as Request;
      const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      mockLoginService.registerUser = jest.fn().mockRejectedValue(new Error('Some error'));

      await loginController.registerUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });

  });

    describe('loginUser', () => {
      it('should log in a user and return a token with 200 status code', async () => {
        const mockReq = { body: { email: 'test@example.com', password: 'password123' } } as Request;
        const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
  
        mockLoginService.login = jest.fn().mockResolvedValue('mockToken');
  
        await loginController.loginUser(mockReq, mockRes);
  
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ token: 'mockToken' });
      });
  
      it('should handle errors and return 500 status code', async () => {
        const mockReq = { body: { email: 'test@example.com', password: 'password123' } } as Request;
        const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
  
        mockLoginService.login = jest.fn().mockRejectedValue(new Error('Some error'));
  
        await loginController.loginUser(mockReq, mockRes);
  
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
      });
    });  

    describe('listUsers', () => {
      it('should list users and return the user list with 200 status code', async () => {
        const mockReq = { headers: { authorization: 'mockToken' }, query: { page: '1' } } as unknown as Request;
        const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
  
        const mockUsers = [
          { email: 'user1@example.com', password: 'password1' },
          { email: 'user2@example.com', password: 'password2' },
        ];
        mockLoginService.listUsers = jest.fn().mockResolvedValue(mockUsers);
  
        await loginController.listUsers(mockReq, mockRes);
  
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockUsers);
      });
  
      it('should handle errors and return 500 status code', async () => {
        const mockReq = { headers: { authorization: 'mockToken' }, query: { page: '1' } } as unknown as Request;
        const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
  
        mockLoginService.listUsers = jest.fn().mockRejectedValue(new Error('Some error'));
  
        await loginController.listUsers(mockReq, mockRes);
  
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
      });
    });
});
