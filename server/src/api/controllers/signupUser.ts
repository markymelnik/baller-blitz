import { User } from '../../database/models/User';
import { insertUserIntoDatabase } from '../../database/queries/insertUserIntoDatabase';
import { Request, Response } from 'express';
import { saltAndHashPassword } from '../../util/saltAndHashPassword';

export const signupUser = async (req: Request, res: Response) => {
  try {
    const newUser: User = req.body;

    await saltAndHashPassword(newUser);

    const signedUpUser = await insertUserIntoDatabase(newUser);
    res.status(201).json(signedUpUser);
    console.log('Successfully signed up user!');
  } catch (err) {
    console.error('Error signing up user', err);
    res.status(500).send('Server error signing up user');
  }
};
