import pool from '../pool';
import { User } from '../models/User';
import { QUERIES } from './QUERIES';

export const insertUserIntoDatabase = async (user: User): Promise<User> => {
  try {
    const { email, username, password } = user;
    const res = await pool.query(QUERIES.CREATE_USER, [
      email,
      username,
      password,
    ]);
    return res.rows[0];
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error executing insert user query', err.stack);
      throw new Error(err.message);
    } else {
      console.error('An unexpected error occurred', err);
      throw new Error('An unexpected error occurred');
    }
  }
};
