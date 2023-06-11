import user, { IUser } from "../../models/user";
import { ILoginRepository } from "../../interfaces/repositories/LoginRepository";
import { LoginService } from "../../services/login.services";
import { MockLoginRepository } from "../repositories/MockLoginRepository";
import MockAdapter from 'axios-mock-adapter';
import axios from "axios";
import { config } from "../../config/config";


describe("LoginService", () => {
  let loginService: LoginService;
  let mockLoginRepository: ILoginRepository;

  beforeEach(() => {
    mockLoginRepository = new MockLoginRepository(user);
    loginService = new LoginService("secretKey", mockLoginRepository);
  });

  describe("registerUser", () => {
    it("should register a new user", async () => {
      const email = "test@example.com";
      const password = "password123";

      await loginService.registerUser(email, password);

      const users = await mockLoginRepository.getUsers();
      expect(users.length).toBe(1);
      expect(users[0].email).toBe(email);
      expect(users[0].password).toBe(password);
    });

    it("should throw an error if the user already exists", async () => {
      const email = "test@example.com";
      const password = "password123";
      await mockLoginRepository.addUser(email, password);

      await expect(loginService.registerUser(email, password)).rejects.toThrow(
        "User with this email already exists"
      );
    });
  });

  describe("login", () => {
    it("should return a token for valid email and password", async () => {
      const email = "test@example.com";
      const password = "password123";
      await mockLoginRepository.addUser(email, password);

      const token = await loginService.login(email, password);

      expect(token).toBeDefined();
    });

    it("should throw an error for invalid email or password", async () => {
      const email = "test@example.com";
      const password = "password123";
      await mockLoginRepository.addUser(email, password);

      await expect(loginService.login(email, "invalidPassword")).rejects.toThrow(
        "Invalid email or password"
      );
      await expect(loginService.login("invalidEmail", password)).rejects.toThrow(
        "Invalid email or password"
      );
    });
  });

describe("listUsers", () => {
    let axiosMock: MockAdapter;

  beforeEach(() => {
    axiosMock = new MockAdapter(axios);
  });

  afterEach(() => {
    axiosMock.restore();
  });
it("should return a list of users with a valid token", async () => {
    const token = "validToken";
    const users: IUser[] = [
      { id: "1", email: "user1@example.com", password: "password1" } as IUser,
      { id: "2", email: "user2@example.com", password: "password2" } as IUser,
    ];
    axiosMock.onGet(`${config.EVENT_BUS_URL}/users?page=1`, { headers: { Authorization: token } }).reply(200, { users });

    const result = await loginService.listUsers(token, '1');

    expect(result).toEqual(users);
  });

  it("should throw an error with an invalid token", async () => {
    const token = "invalidToken";
    axiosMock.onGet(`${config.EVENT_BUS_URL}/users`, { headers: { Authorization: token } }).reply(401);

    await expect(loginService.listUsers(token, '1')).rejects.toThrow("Error retrieving user list");
  });
  });
});
