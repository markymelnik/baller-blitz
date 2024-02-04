import { DatabaseUser, RequestingUser } from "../database/models/userModel";
import bcrypt from 'bcrypt';
import { AuthenticationError } from "../errors/ErrorClasses";
import { DatabaseQuery } from "../database/queries/DatabaseQuery";

export async function authenticateLoginCredentials(requestingUser: RequestingUser) {
	try {
		const databaseUser: DatabaseUser = await DatabaseQuery.findUserByEmail(requestingUser.email);
		
		if (!databaseUser) {
			throw new AuthenticationError('Login failed. Try again.');
		}
		const doPasswordsMatch = await bcrypt.compare(requestingUser.password, databaseUser.password);
		if (!doPasswordsMatch) {
			throw new AuthenticationError('Login failed. Try again.');
		}

		return databaseUser;

	} catch (error) {
		throw error;
	}
}