import { Request, Response } from 'express';

export const logoutUser = (request: Request, response: Response) => {
  response.cookie('refreshToken', '', { httpOnly: true, maxAge: 1 });
  response.status(200).json({ message: 'Logged out successfully.' });
};
