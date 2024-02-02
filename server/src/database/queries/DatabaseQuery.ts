import { DatabaseUser, RequestingUser } from "../models/userModel";
import pool from "../pool";
import { QUERIES } from "./QUERIES";

export const DatabaseQuery = {
	
	async findUserById (userId: number): Promise<DatabaseUser> {
		try {
			const res = await pool.query(QUERIES.FIND_USER_BY_ID, [userId]);
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
	},

	async findUserByEmail (email: string): Promise<DatabaseUser> {
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
	},

	async getUserRoleById (userId: number): Promise<string> {
		try {
			const result = await pool.query(QUERIES.GET_USER_ROLE_BY_ID, [userId]);
			return result.rows[0].name;
		} catch (error) {
			console.error('Error retrieving user role', error);
			throw new Error('Failed to retrieve user role');
		}
	},

	async insertUserIntoDatabase (requestingUser: RequestingUser): Promise<DatabaseUser> {
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
	},
}