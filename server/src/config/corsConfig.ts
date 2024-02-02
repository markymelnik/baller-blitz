import { CorsOptions } from "cors";
import { FRONTEND_PORT, FRONTEND_URL } from "../env";

export const corsOptions: CorsOptions = {
	origin: `${FRONTEND_URL}:${FRONTEND_PORT}`,
	credentials: true,
}