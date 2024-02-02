import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { AuthResponseObject } from '../../database/models/userModel';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../../env';
import { DatabaseQuery } from '../../database/queries/DatabaseQuery';
import { TokenError } from '../../errors/ErrorClasses';
import { AccessTokenProps, RefreshTokenProps } from '../../database/models/tokenModel';
import { TokenCreator } from './TokenCreator';

export const TokenController = {

	validateAccessToken(request: Request, response: Response, next: NextFunction) {
		const accessToken = request.cookies.accessToken;
  
		if (!accessToken) {
			throw new TokenError('Access token is missing');
		}
	
		try {
			jwt.verify(accessToken, ACCESS_TOKEN_SECRET as string);
			next();
		} catch (error) {
			throw new TokenError('Failed to validate access token');
	
			/* if (error instanceof jwt.TokenExpiredError) {
				return response.status(401).json({ message: 'Token expired' });
			}
	
			if (error instanceof jwt.JsonWebTokenError) {
				return response.status(401).json({ message: 'Invalid token' });
			}
	
			return response.status(500).json({ message: 'Failed to authenticate token' }); */
		}
	},

	async refreshAccessToken(request: Request, response: Response) {
		const refreshToken = request.cookies.refreshToken;
	
		if (!refreshToken) {
			return response.status(404).send({ message: 'Refresh token not found' })
		};

		try {
			jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (error: Error | null, decoded: Object | undefined) => {
				const refreshToken = decoded as RefreshTokenProps;
				const refreshTokenUserId = refreshToken.id;
	
				const { id, email } = await DatabaseQuery.findUserById(refreshTokenUserId);
				const role = await DatabaseQuery.getUserRoleById(refreshTokenUserId);

				const newAccessToken = TokenCreator.generateAccessToken({ userId: refreshTokenUserId });
	
				const responseObject: AuthResponseObject = {
					user: { id, email, role },
					accessToken: newAccessToken,
				};
	
				return response.status(200).send(responseObject);
				});
			} catch (error) {
				throw new Error('Failed to validate refresh token');
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
