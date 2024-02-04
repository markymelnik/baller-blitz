import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY, REFRESH_TOKEN_SECRET } from '../../env';
import { AccessTokenProps, RefreshTokenProps } from '../../database/models/tokenModel';
import { TokenError } from '../../errors/ErrorClasses';

export const TokenCreator = {

	generateAccessToken ({ userId }: AccessTokenProps) {
		const options = { expiresIn: `${ACCESS_TOKEN_EXPIRY}`};
		try {
			return jwt.sign({ id: userId }, ACCESS_TOKEN_SECRET, options);
		} catch (error) {
			throw new TokenError('Problem generating access token.')
		}
	},

	generateRefreshToken({ userId }: RefreshTokenProps) {
		const options = { expiresIn: `${REFRESH_TOKEN_EXPIRY}` };
		try {
			return jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET, options);
		} catch (error) {
			throw new TokenError('Problem generating refresh token.')
		}
	},
}