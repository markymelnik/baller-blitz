import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../env';
import { ValidationError } from '../errors/ErrorClasses';

export const saltAndHashPassword = async (password: string) => {
  if (!password) {
    throw new ValidationError('Password is required');
  }

  return bcrypt.hash(password, SALT_ROUNDS);
};
