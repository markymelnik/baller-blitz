import { DatabaseUser, RequestingUser } from '../../database/models/User';
import { insertUserIntoDatabase } from '../../database/queries/insertUserIntoDatabase';
import { Request, Response } from 'express';
import { saltAndHashPassword } from '../../util/saltAndHashPassword';

export const signupUser = async (req: Request, res: Response) => {
  try {
    const newUser: RequestingUser = req.body;

    const saltedAndHashedPassword = await saltAndHashPassword(newUser.password);
    newUser.password = saltedAndHashedPassword;

    const databaseUser: DatabaseUser = await insertUserIntoDatabase(newUser);
    res.status(201).json(databaseUser);
  } catch (err) {
    console.error('Error signing up user', err);
    res.status(500).send('Server error signing up user');
  }
};
