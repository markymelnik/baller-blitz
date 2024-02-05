import { isTokenValid } from "./isTokenValid.ts";

export function checkTokenValidity(accessToken: string) {
	return accessToken ? isTokenValid(accessToken) : false;
}