import { Request, Response } from "express";
import { findUserByEmail } from "../../database/queries/findUserByEmail";
import { DatabaseUser, RequestingUser, Role, UserResponseObject } from "../../database/models/User";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getUserRoleById } from "../../database/queries/getUserRoleById";
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT secret is undefined');
}

export const loginUser = async (request: Request, response: Response) => {
  try {
    const requestingUser: RequestingUser = request.body;
    const { email, password } = requestingUser;

    if (!email || !password) {
      return response
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const databaseUser: DatabaseUser = await findUserByEmail(email);
    if (!databaseUser) {
      return response.status(404).json({ message: 'Invalid login credentials' });
    }

    const doPasswordsMatch = await bcrypt.compare(password, databaseUser.password);
    if (!doPasswordsMatch) {
      return response.status(401).json({ message: 'Invalid login credentials' });
    }

    const databaseUserRole: string = await getUserRoleById(databaseUser.id);   

    const token = jwt.sign({ id: databaseUser.id }, JWT_SECRET, { expiresIn: '1h' });

    response.cookie('jwt', token, {
      httpOnly: true,
      /* secure: true, */
      sameSite: 'strict',
    });

    const responseObject: UserResponseObject = {
      user: {
        id: databaseUser.id,
        email: databaseUser.email,
        role: databaseUserRole,
      },
    };

    response.status(200).send(responseObject);
  } catch (err) {
    console.error('Error logging in user', err);
    response.status(500).send('Server error logging in user');
  }
};