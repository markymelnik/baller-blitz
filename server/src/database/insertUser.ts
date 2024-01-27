import { queries } from './queries';
import pool from './database';

type InsertUser = {
    email: string,
    username: string,
    password: string,
}

export const insertUser = async (
  email: string,
  username: string,
  password: string
): Promise<InsertUser> => {
  try {
    const res = await pool.query(queries.CREATE_USER, [
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