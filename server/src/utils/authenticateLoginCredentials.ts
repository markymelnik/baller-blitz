import { RequestingUser } from "../database/models/userModel";
import bcrypt from 'bcrypt';
import { ValidationError } from "../errors/ErrorClasses";
import { DatabaseQuery } from "../database/queries/DatabaseQuery";

export async function authenticateLoginCredentials(requestingUser: RequestingUser) {
	const databaseUser = await DatabaseQuery.findUserByEmail(requestingUser.email);
	if (!databaseUser) {
		throw new ValidationError('User not found');
	}

	const doPasswordsMatch = await bcrypt.compare(requestingUser.password, databaseUser.password);
	if (!doPasswordsMatch) {
		throw new ValidationError('Password does not match');
	}

	return databaseUser;
}