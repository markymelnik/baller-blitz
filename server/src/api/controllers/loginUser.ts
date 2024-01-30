import { Request, Response } from "express";
import { findUserByEmail } from "../../database/queries/findUserByEmail";
import { DatabaseUser, RequestingUser, UserResponseObject } from "../../database/models/User";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT secret is undefined');
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const requestingUser: RequestingUser = req.body;
    const { email, password } = requestingUser;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const databaseUser: DatabaseUser = await findUserByEmail(email);
    if (!databaseUser) {
      return res.status(404).json({ message: 'Invalid login credentials' });
    }

    const doPasswordsMatch = await bcrypt.compare(password, databaseUser.password);
    if (!doPasswordsMatch) {
      return res.status(401).json({ message: 'Invalid login credentials' });
    }

    const token = jwt.sign({ id: databaseUser.id }, JWT_SECRET, { expiresIn: '1h' });

    const responseObject: UserResponseObject = {
      token: token,
      user: {
        id: databaseUser.id,
        email: databaseUser.email,
      }
    }

    res.status(200).send(responseObject);
  } catch (err) {
    console.error('Error logging in user', err);
    res.status(500).send('Server error logging in user');
  }
};