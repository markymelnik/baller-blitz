import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { generateAccessToken } from '../../utils/generateAccessToken';
import { getUserRoleById } from '../../database/queries/getUserRoleById';
import { AuthResponseObject } from '../../database/models/userModel';
import { findUserById } from '../../database/queries/findUserById';
import { REFRESH_TOKEN_SECRET } from '../../env';

interface RefreshTokenPayload extends JwtPayload {
  id: number; 
}

export const TokenController = {
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
	
				const refreshToken = decoded as RefreshTokenPayload;
				const refreshTokenUserId = refreshToken.id;
	
				const databaseUser = await findUserById(refreshTokenUserId);
				if (!databaseUser) {
					return response.status(404).json({ message: 'Could not find user' });
				}
	
				const databaseUserRole: string = await getUserRoleById(refreshTokenUserId); 
				
				const newAccessToken = generateAccessToken({ userId: refreshTokenUserId });
	
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
