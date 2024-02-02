import 'dotenv/config';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY!;

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY!;

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS!);

const FRONTEND_PORT = process.env.FRONTEND_PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

const BACKEND_PORT = process.env.BACKEND_PORT;

const DB_PORT = parseInt(process.env.DB_PORT!);
const DB_USER = process.env.DB_USER;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_PASS = process.env.DB_PASS;

export {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,

  SALT_ROUNDS,

	FRONTEND_PORT,
	FRONTEND_URL,
	
	BACKEND_PORT,

	DB_PORT,
	DB_USER,
	DB_HOST,
	DB_NAME,
	DB_PASS,
};
