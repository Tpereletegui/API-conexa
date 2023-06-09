import axios from 'axios';
import { loginServiceUrl, businessLoginUrl } from '../config';

export const fetchLoginServiceUsers = async (): Promise<any> => {
  try {
    const response = await axios.get(`http://localhost:${loginServiceUrl}/users`);
    return response.data.users;
  } catch (error) {
    console.error('Error fetching users from login-service:', error);
    throw new Error('Failed to fetch users from login-service');
  }
};

