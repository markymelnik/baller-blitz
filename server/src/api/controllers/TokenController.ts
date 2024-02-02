import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { AuthResponseObject } from '../../database/models/userModel';
import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY, REFRESH_TOKEN_SECRET } from '../../env';
import { DatabaseQuery } from '../../database/queries/DatabaseQuery';

interface AccessTokenProps extends JwtPayload {
	userId: number,
}

interface RefreshTokenProps extends JwtPayload {
  userId: number; 
}

export const TokenController = {

	generateAccessToken({ userId }: AccessTokenProps) {
		const options = {
			expiresIn: `${ACCESS_TOKEN_EXPIRY}`,
		}
		try {
			return jwt.sign({ id: userId }, ACCESS_TOKEN_SECRET, options);
		}
		catch (error) {
			console.error('Error generating refresh token', error);
			throw new Error('Error');
		}
	},

	generateRefreshToken({ userId }: RefreshTokenProps) {
		const options = {
			expiresIn: `${REFRESH_TOKEN_EXPIRY}`,
		}
		try {
			return jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET, options);
		}
		catch (error) {
			console.error('Error generating refresh token', error);
			throw new Error('Error');
		}
	},

	validateAccessToken(request: Request, response: Response, next: NextFunction) {
		const token = request.cookies.jwt;
  
		if (!token) {
			return response.status(401).json({ message: 'No token provided' });
		}
	
		try {
			jwt.verify(token, ACCESS_TOKEN_SECRET as string);
			next();
		} catch (error) {
			console.error('Failed to validate token', error);
	
			if (error instanceof jwt.TokenExpiredError) {
				return response.status(401).json({ message: 'Token expired' });
			}
	
			if (error instanceof jwt.JsonWebTokenError) {
				return response.status(401).json({ message: 'Invalid token' });
			}
	
			return response.status(500).json({ message: 'Failed to authenticate token' });
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

	async refreshToken(request: Request, response: Response) {
		const refreshToken = request.cookies.refreshToken;
	
		if (!refreshToken) {
			return response.status(401).json({ message: 'Refresh token is missing'});
		};
	
		try {
			jwt.verify( refreshToken, REFRESH_TOKEN_SECRET, async (error: Error | null, decoded: Object | undefined) => {
				if (error) {
					return response.status(403).json({ message: 'Invalid refresh token'});
				}
	
				const refreshToken = decoded as RefreshTokenProps;
				const refreshTokenUserId = refreshToken.id;
	
				const databaseUser = await DatabaseQuery.findUserById(refreshTokenUserId);
				if (!databaseUser) {
					return response.status(404).json({ message: 'Could not find user' });
				}
	
				const databaseUserRole: string = await DatabaseQuery.getUserRoleById(refreshTokenUserId); 
				
				const newAccessToken = this.generateAccessToken({ userId: refreshTokenUserId });
	
				const responseObject: AuthResponseObject = {
					user: {
						id: databaseUser.id,
						email: databaseUser.email,
						role: databaseUserRole,
					},
					accessToken: newAccessToken,
				};
	
				return response.status(200).send(responseObject);
			})
	
		} catch (error) {
			return response.status(500).json({ message: 'Server error access token' });
		}
	}
}
