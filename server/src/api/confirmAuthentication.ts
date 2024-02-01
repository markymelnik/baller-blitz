import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { generateAccessToken } from '../util/generateAccessToken';
import { getUserRoleById } from '../database/queries/getUserRoleById';
import { UserResponseObject } from '../database/models/User';
import 'dotenv/config';
import { findUserById } from '../database/queries/findUserById';

interface RefreshTokenPayload extends JwtPayload {
  id: number; 
}

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

if (!REFRESH_TOKEN_SECRET) {
  throw new Error('Access token secret is undefined');
}

export const confirmAuthentication = async (request: Request, response: Response) => {
	const refreshToken = request.cookies.refreshToken;

	if (!refreshToken) {
		return response.status(401).json({ message: 'Refresh token is missing'});
	};

	try {
		jwt.verify( refreshToken, REFRESH_TOKEN_SECRET, async (error: Error | null, decoded: Object | undefined) => {
			if (error) {
				return response.status(403).json({ message: 'Invalid refresh token'});
			}

			const refreshToken = decoded as RefreshTokenPayload;
			const refreshTokenUserId = refreshToken.id;

			const databaseUser = await findUserById(refreshTokenUserId);
			if (!databaseUser) {
				return response.status(404).json({ message: 'Could not find user' });
			}

			const databaseUserRole: string = await getUserRoleById(refreshTokenUserId); 
			
			const newAccessToken = generateAccessToken({ userId: refreshTokenUserId });

			const responseObject: UserResponseObject = {
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