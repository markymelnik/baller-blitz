import jwt from 'jsonwebtoken';
import 'dotenv/config';

type AccessTokenProps = {
	userId: number;
}

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;

if (!ACCESS_TOKEN_SECRET) {
  throw new Error('JWT secret is undefined');
}

export const generateAccessToken = ({ userId }: AccessTokenProps) => {
	const options = {
		expiresIn: `${ACCESS_TOKEN_EXPIRY}`,
	}
	
	return jwt.sign({ id: userId }, ACCESS_TOKEN_SECRET, options);
}