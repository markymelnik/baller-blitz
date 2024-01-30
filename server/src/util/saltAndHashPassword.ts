import bcrypt from 'bcrypt';

const saltRounds = 10;

export const saltAndHashPassword = async (password: string) => {
  if (!password) {
    throw new Error('Error with your password');
  }

  return bcrypt.hash(password, saltRounds);
};
