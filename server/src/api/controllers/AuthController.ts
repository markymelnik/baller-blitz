import { Request, Response } from "express";
import { DatabaseUser, RequestingUser, AuthResponseObject } from "../../database/models/userModel";
import { saltAndHashPassword } from "../../utils/saltAndHashPassword";
import { validateLoginCredentials } from "../../utils/validateLoginCredentials";
import { DatabaseQuery } from "../../database/queries/DatabaseQuery";
import { TokenController } from "./TokenController";
import { authenticateLoginCredentials } from "../../utils/authenticateLoginCredentials";

export const AuthController = {
	async signupUser(request: Request, response: Response) {
		try {
			const newUser: RequestingUser = request.body;
	
			const saltedAndHashedPassword = await saltAndHashPassword(newUser.password);
			newUser.password = saltedAndHashedPassword;
	
			const databaseUser: DatabaseUser = await DatabaseQuery.insertUserIntoDatabase(newUser);

			response.status(201).json(databaseUser);
		} catch (err) {
			console.error('Error signing up user', err);
			response.status(500).send('Server error signing up user');
		}
	},

	async loginUser(request: Request, response: Response) {
		try {
			const requestingUser: RequestingUser = request.body;
			validateLoginCredentials(requestingUser);

			const databaseUser: DatabaseUser = await authenticateLoginCredentials(requestingUser);
			const databaseUserRole: string = await DatabaseQuery.getUserRoleById(databaseUser.id);   
	
			const accessToken = TokenController.generateAccessToken({ userId: databaseUser.id });
			const refreshToken = TokenController.generateRefreshToken({ userId: databaseUser.id });
	
			TokenController.setRefreshTokenCookie(response, refreshToken);
	
			const responseObject: AuthResponseObject = {
				user: {
					id: databaseUser.id,
					email: databaseUser.email,
					role: databaseUserRole,
				},
				accessToken,
			};
	
			response.status(200).send(responseObject);
		} catch (err) {
			console.error('Error logging in user', err);
			response.status(500).send('Server error logging in user');
		}
	},

	logoutUser(request: Request, response: Response) {
		response.cookie('refreshToken', '', { httpOnly: true, maxAge: 1 });
		response.status(200).json({ message: 'Logged out successfully.' });
	},
}