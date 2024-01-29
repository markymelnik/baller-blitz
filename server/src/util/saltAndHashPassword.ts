import bcrypt from 'bcrypt';
import { User } from '../database/models/User';

const saltRounds = 10;

export const saltAndHashPassword = async (user: User) => {
  if (user && user.password) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  } else {
    throw new Error('Error with your password');
  }
};
