import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../env';

export const saltAndHashPassword = async (password: string) => {
  if (!password) {
    throw new Error('Error with your password');
  }

  return bcrypt.hash(password, SALT_ROUNDS);
};
