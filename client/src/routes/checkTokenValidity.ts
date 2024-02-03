import { isTokenValid } from "../utils/isTokenValid.ts";

export function checkTokenValidity(accessToken: string) {
	return accessToken ? isTokenValid(accessToken) : false;
}