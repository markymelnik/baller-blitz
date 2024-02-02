import pool from '../pool';
import { DatabaseUser, RequestingUser } from '../models/userModel';
import { QUERIES } from './QUERIES';

export const insertUserIntoDatabase = async (requestingUser: RequestingUser): Promise<DatabaseUser> => {
  try {
    const { email, password } = requestingUser;
    const result = await pool.query(QUERIES.CREATE_USER, [
      email,
      password,
    ]);

    const userId = result.rows[0].id;
    const defaultUserRoleId = 2;

    await pool.query(QUERIES.ASSIGN_DEFAULT_ROLE, [
      userId,
      defaultUserRoleId,
    ]);
    return result.rows[0];
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
