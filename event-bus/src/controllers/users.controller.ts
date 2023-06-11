import { Request, Response } from 'express';
import axios from 'axios';
import { businessLoginUrl } from '../config';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    const page = req.query.page;
    const email = req.query.email as string;
    const emailParam = email != null && email != '' ? `&email=${email}` : ''
    const queryParams = `?page=${page}${emailParam}`
    const businessServiceResponse = await axios.get(`${businessLoginUrl}/users${queryParams}`, {
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
