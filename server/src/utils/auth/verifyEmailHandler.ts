import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, FRONTEND_PORT, FRONTEND_URL } from "../../env";
import { DatabaseQuery } from "../../database/queries/DatabaseQuery";
import { DatabaseUser, LoginResponse } from "../../database/models/userModel";
import { TokenCreator } from "../../api/token/TokenCreator";
import { TokenController } from "../../api/token/TokenController";

export const verifyEmailHandler = async (request: Request, response: Response) => {
	const { token } = request.query;

	if (!token) {
		return response.status(400).send('Verification token is required');
	}

	try {
		const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET as string);
		const userId = decoded.userId;

		const emailVerified= await DatabaseQuery.markEmailVerifiedInDB(userId);
		if (!emailVerified) {
      return response.status(404).send('User not found or could not verify email.');
    }

		const databaseUser: DatabaseUser = await DatabaseQuery.findUserByIdFromDB(userId);
		if (!databaseUser) {
      return response.status(404).send('User not found.');
    }

		const databaseUserRole: string = await DatabaseQuery.getUserRoleByIdFromDB(
			databaseUser.id
		);
		if (!databaseUserRole) {
      return response.status(404).send('User role not found.');
    }

		const accessToken = TokenCreator.generateAccessToken({
			userId: databaseUser.id,
		});
		const refreshToken = TokenCreator.generateRefreshToken({
			userId: databaseUser.id,
		});

		TokenController.setRefreshTokenCookie(response, refreshToken);

		const responseObject: LoginResponse = {
			user: {
				id: databaseUser.id,
				email: databaseUser.email,
				role: databaseUserRole,
				is_verified: databaseUser.is_verified
			},
			accessToken,
		};

		response
			.redirect(`${FRONTEND_URL}:${FRONTEND_PORT}/verify-success`);

	} catch (error) {
    response.status(401).send('Invalid or expired token');
  }
}