import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../../env';

export const saltAndHashPassword = async (password: string) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};
