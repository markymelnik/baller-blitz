import { CustomError } from "./CustomError";

export class ValidationError extends CustomError {
	constructor(message: string) {
		super(400, 'validation_error', message);
		Object.setPrototypeOf(this, ValidationError.prototype);
	}
}