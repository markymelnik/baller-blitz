import { ENV } from "../env.ts"

export function createBackendEndpointUrl (path: string) {
	const { BACKEND_URL, BACKEND_PORT } = ENV;
	return `${BACKEND_URL}:${BACKEND_PORT}${path}`;
}