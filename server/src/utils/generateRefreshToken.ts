import jwt from 'jsonwebtoken';
import { REFRESH_TOKEN_EXPIRY, REFRESH_TOKEN_SECRET } from '../env';

type RefreshTokenProps = {
	userId: number;
}

export const generateRefreshToken = ({ userId }: RefreshTokenProps) => {
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
}