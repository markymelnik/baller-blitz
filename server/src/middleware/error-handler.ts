import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/CustomError";

interface ErrorConfig {
  type: new (...args: any[]) => Error,
  statusCode: number,
  errorCode: string,
  errorMessage: string,
}

export function ErrorHandler(config: ErrorConfig[]) {
  return (err: Error, request: Request, response: Response, next: NextFunction) => {

    let statusCode = 500;
    let errorCode = 'internal_error';
    let errorMessage = 'An unexpected error occurred';

    if (err instanceof CustomError) {
      statusCode = err.statusCode;
      errorCode = err.errorCode;
      errorMessage = err.message;
    } else {
      const errorConfig = config.find((c) => err instanceof c.type) || { statusCode, errorCode, errorMessage };
      statusCode = errorConfig.statusCode;
      errorCode = errorConfig.errorCode;
      errorMessage = errorConfig.errorMessage;
    }

    response.status(statusCode).json({
      error: {
        code: errorCode,
        message: errorMessage,
      },
    });
  };
}
