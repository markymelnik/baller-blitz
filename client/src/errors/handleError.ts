import { CustomError } from "./CustomError.ts";

export function handleError(error: CustomError) {
	console.error(`Error: ${error.message}`,`|`,`Status: ${error.statusCode}`,`|`,`Error Code: ${error.errorCode}`);
}