import { ENV } from "../env.ts"

export function createBackendEndpointUrl (path: string) {
	const { BACKEND_URL } = ENV;
	return `${BACKEND_URL}${path}`;
}