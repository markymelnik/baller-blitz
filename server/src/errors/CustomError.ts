export class CustomError extends Error {
	statusCode: number;
	errorCode: string;

	constructor(statusCode: number, errorCode: string, message: string) {
		super(message);
		this.statusCode = statusCode;
		this.errorCode = errorCode;
		this.name = this.constructor.name;
		Object.setPrototypeOf(this, CustomError.prototype);
	}
}