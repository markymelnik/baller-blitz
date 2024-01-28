import { Request, Response } from "express";
import { findUserByEmail } from "../../database/queries/findUserByEmail";
import { User } from "../../database/models/User";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const requestingUser: User = req.body;
    const { email, username, password } = requestingUser;

    if (!email && !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const databaseUser = await findUserByEmail(email);

    if (!databaseUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).send({ message: 'Successfully logged in' });
  } catch (err) {
    console.error('Error logging in user', err);
    res.status(500).send('Server error logging in user');
  }
};