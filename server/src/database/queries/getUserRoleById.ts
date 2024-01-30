import { Role } from '../models/User';
import pool from '../pool';
import { QUERIES } from './QUERIES';

export const getUserRoleById = async (userId: number): Promise<string> => {
  try {
    const result = await pool.query(QUERIES.GET_USER_ROLE_BY_ID, [userId]);
    return result.rows[0].name;
  } catch (error) {
    console.error('Error retrieving user role', error);
    throw new Error('Failed to retrieve user role');
  }
};
