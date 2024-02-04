import { NextFunction, Request, Response } from "express";
import { DatabaseUser, LoginResponse, RequestingUser, SignupResponse } from "../../database/models/userModel";
import { saltAndHashPassword } from "../../utils/saltAndHashPassword";
import { validateLoginCredentials } from "../../utils/validateLoginCredentials";
import { DatabaseQuery } from "../../database/queries/DatabaseQuery";
import { TokenController } from "../token/TokenController";
import { authenticateLoginCredentials } from "../../utils/authenticateLoginCredentials";
import { TokenCreator } from "../token/TokenCreator";

export const AuthController = {
	async signupUser(request: Request, response: Response, next: NextFunction) {
		try {
			const requestingUser: RequestingUser = request.body;
			validateLoginCredentials(requestingUser);
	
			const saltedAndHashedPassword = await saltAndHashPassword(requestingUser.password);
			requestingUser.password = saltedAndHashedPassword;

			await DatabaseQuery.insertUserIntoDatabase(requestingUser);

			const responseObject: SignupResponse = {
				status: true,
				message: 'Successful signup'
			}

			response.status(201).json(responseObject);

		} catch (error) {
			console.log(error);
			next(error);
		}
	},

	async loginUser(request: Request, response: Response, next: NextFunction) {
		try {
			const requestingUser: RequestingUser = request.body;
			validateLoginCredentials(requestingUser);

			const databaseUser: DatabaseUser = await authenticateLoginCredentials(requestingUser);
			const databaseUserRole: string = await DatabaseQuery.getUserRoleById(databaseUser.id);   
	
			const accessToken = TokenCreator.generateAccessToken({ userId: databaseUser.id });
			const refreshToken = TokenCreator.generateRefreshToken({ userId: databaseUser.id });
	
			TokenController.setRefreshTokenCookie(response, refreshToken);
	
			const responseObject: LoginResponse = {
				user: {
					id: databaseUser.id,
					email: databaseUser.email,
					role: databaseUserRole,
				},
				accessToken,
			};
	
			response.status(200).send(responseObject);
		} catch (error) {
			next(error);
		}
	},

	logoutUser(request: Request, response: Response) {
		response.cookie('refreshToken', '', { httpOnly: true, maxAge: 1 });
		response.status(200).json({ message: 'Logged out successfully.' });
	},
}