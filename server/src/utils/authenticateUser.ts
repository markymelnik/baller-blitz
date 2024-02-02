import { RequestingUser } from "../database/models/userModel";
import { findUserByEmail } from "../database/queries/findUserByEmail";
import bcrypt from 'bcrypt';

export async function authenticateByEmailAndPassword(requestingUser: RequestingUser) {
	const databaseUser = await findUserByEmail(requestingUser.email);
	if (!databaseUser) {
		throw new Error('Invalid login credentials');
	}

	const doPasswordsMatch = await bcrypt.compare(requestingUser.password, databaseUser.password);
	if (!doPasswordsMatch) {
		throw new Error('Invalid login credentials');
	}

	return databaseUser;
}