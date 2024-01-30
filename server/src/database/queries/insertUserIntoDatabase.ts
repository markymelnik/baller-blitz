import pool from '../pool';
import { DatabaseUser, RequestingUser } from '../models/User';
import { QUERIES } from './QUERIES';

export const insertUserIntoDatabase = async (user: RequestingUser): Promise<DatabaseUser> => {
  try {
    const { email, password } = user;
    const res = await pool.query(QUERIES.CREATE_USER, [
      email,
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
