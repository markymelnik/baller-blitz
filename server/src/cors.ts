import { CorsOptions } from "cors";
import 'dotenv/config';

const FRONTEND_URL = process.env.FRONTEND_URL;
const FRONTEND_PORT = process.env.FRONTEND_PORT;

export const corsOptions: CorsOptions = {
	origin: `${FRONTEND_URL}:${FRONTEND_PORT}`,
	credentials: true,
}