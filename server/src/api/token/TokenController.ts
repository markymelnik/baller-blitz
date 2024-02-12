import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../../env';
import { DatabaseQuery } from '../../database/queries/DatabaseQuery';
import { TokenError } from '../../errors/ErrorClasses';
import { RefreshTokenProps } from '../../database/models/tokenModel';
import { TokenCreator } from './TokenCreator';
import { LoginResponse } from '../../database/models/userModel';

export const TokenController = {

	validateAccessToken(request: Request, response: Response, next: NextFunction) {
		const authHeader = request.headers['authorization'];
		const accessToken = authHeader && authHeader.split(' ')[1];
  
		if (!accessToken) {
			throw new TokenError('Access token is missing.');
		}
	
		try {
			const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET as string);
			request.user = decoded;
			next();
		} catch (error) {
			let errorMessage = 'Invalid token.';
			if (error instanceof jwt.TokenExpiredError) {
				errorMessage = 'Expired token.';
			}
			return response.status(401).send(errorMessage);
		}
	},

	async refreshAccessToken(request: Request, response: Response) {
		const refreshToken = request.cookies.refreshToken;
	
		if (!refreshToken) {
			return response.status(404).send({ message: 'Refresh token not found'});
		};

		try {
			const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET as RefreshTokenProps);

				const refreshTokenUserId = decoded.id;
	
				const { id, email, is_verified } = await DatabaseQuery.findUserByIdFromDB(refreshTokenUserId);
				const role = await DatabaseQuery.getUserRoleByIdFromDB(refreshTokenUserId);

				const newAccessToken = TokenCreator.generateAccessToken({ userId: refreshTokenUserId });
	
				const responseObject: LoginResponse = {
					user: { id, email, role, is_verified },
					accessToken: newAccessToken,
				};
	
				return response.status(200).send(responseObject);
			
			} catch (error) {
				return response.status(404).send({ message: 'Access token could not be refreshed' });
		}
	},

	setRefreshTokenCookie(response: Response, refreshToken: string) {
		response.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			path: '/',
			/* secure: false, */
			sameSite: 'lax',
			maxAge: 1 * 24 * 60 * 60 * 1000,
		});
	},
}
