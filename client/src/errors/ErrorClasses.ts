import { CustomError } from "./CustomError.ts";

export class AuthenticationError extends CustomError {
	constructor(message: string) {
		super(401, 'authentication_error', message);
		Object.setPrototypeOf(this, AuthenticationError.prototype)
	}
}

export class TokenError extends CustomError {
	constructor(message: string) {
		super(401, 'token_error', message);
		Object.setPrototypeOf(this, TokenError.prototype);
	}
}

export class NetworkError extends CustomError {
	constructor(message: string, statusCode: number) {
		super(statusCode, 'network_error', message);
		Object.setPrototypeOf(this, TokenError.prototype);
	}
}