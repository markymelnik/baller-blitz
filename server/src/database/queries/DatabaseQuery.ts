import { DatabaseError } from "../../errors/ErrorClasses";
import { DatabaseUser, RequestingUser } from "../models/userModel";
import pool from "../pool";
import { QUERIES } from "./QUERIES";

export const DatabaseQuery = {
	
	async findUserById (userId: number): Promise<DatabaseUser> {
		try {
			const response = await pool.query(QUERIES.FIND_USER_BY_ID, [userId]);
			return response.rows[0] || null;
		} catch (error) {
			throw new DatabaseError('User not found');
		}
	},

	async findUserByEmail (email: string): Promise<DatabaseUser> {
		try {
			const response = await pool.query(QUERIES.FIND_USER_BY_EMAIL, [email]);
			return response.rows[0] || null;
		} catch (error) {
			throw new DatabaseError('User not found');
		}
	},

	async getUserRoleById (userId: number): Promise<string> {
		try {
			const result = await pool.query(QUERIES.GET_USER_ROLE_BY_ID, [userId]);
			return result.rows[0].name;
		} catch (error) {
			throw new DatabaseError('Role not found');
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
		} catch (error) {
			throw new DatabaseError('Failed to signup new user')
		}
	},
}