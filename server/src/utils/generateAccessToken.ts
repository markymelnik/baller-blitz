import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_SECRET } from '../env';

type AccessTokenProps = {
	userId: number;
}

export const generateAccessToken = ({ userId }: AccessTokenProps) => {
	const options = {
		expiresIn: `${ACCESS_TOKEN_EXPIRY}`,
	}
	
	return jwt.sign({ id: userId }, ACCESS_TOKEN_SECRET, options);
}