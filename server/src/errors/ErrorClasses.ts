import { CustomError } from "./CustomError";

export class ValidationError extends CustomError {
	constructor(message: string) {
		super(400, 'validation_error', message);
		Object.setPrototypeOf(this, ValidationError.prototype);
	}
}

export class AuthenticationError extends CustomError {
	constructor(message: string) {
		super(401, 'authentication_error', message);
		Object.setPrototypeOf(this, AuthenticationError.prototype)
	}
}

export class DatabaseError extends CustomError {
	constructor(message: string) {
		super(500, 'database_error', message);
		Object.setPrototypeOf(this, DatabaseError.prototype);
	}
}

export class TokenError extends CustomError {
	constructor(message: string) {
		super(401, 'token_error', message);
		Object.setPrototypeOf(this, TokenError.prototype);
	}
}

export class DuplicateEmailError extends CustomError {
	constructor(message: string) {
		super(400, 'duplicate_email_error', message);
		Object.setPrototypeOf(this, DuplicateEmailError.prototype);
	}
}

export class IncorrectEmailFormatError extends CustomError {
	constructor(message: string) {
		super(400, 'incorrect_email_format_error', message);
		Object.setPrototypeOf(this, IncorrectEmailFormatError.prototype);
	}
}