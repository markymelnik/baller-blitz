import pool from '../pool';
import { DatabaseUser } from '../models/User';
import { QUERIES } from './QUERIES';

export const findUserByEmail = async (email: string): Promise<DatabaseUser> => {
  try {
    const res = await pool.query(QUERIES.FIND_USER_BY_EMAIL, [email]);
    return res.rows[0] || null;
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error executing find user by email query', err.stack);
      throw new Error(err.message);
    } else {
      console.error('An unexpected error occurred', err);
      throw new Error('An unexpected error occurred');
    }
  }
};
