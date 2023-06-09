import { Request, Response } from 'express';
import axios from 'axios';
import { businessLoginUrl } from '../config';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    const businessServiceResponse = await axios.get(`${businessLoginUrl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const users = businessServiceResponse.data.users;

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
