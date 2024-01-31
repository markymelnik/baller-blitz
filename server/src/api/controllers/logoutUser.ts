import { Request, Response } from 'express';

export const logoutUser = async (request: Request, response: Response) => {
  response.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
  response.status(200).json({ message: 'Logged out successfully.' });
};
