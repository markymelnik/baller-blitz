import jwt from 'jsonwebtoken';
import 'dotenv/config';

type RefreshTokenProps = {
	userId: number;
}

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;

if (!REFRESH_TOKEN_SECRET) {
  throw new Error('Refresh token secret is undefined');
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