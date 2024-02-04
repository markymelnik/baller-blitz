import { AuthenticationError, DatabaseError, DuplicateEmailError, IncorrectEmailFormatError, TokenError, ValidationError } from "../errors/ErrorClasses";

export const errorConfig = [
  {
    type: ValidationError,
    statusCode: 400,
    errorCode: 'validation_error',
    errorMessage: 'Bad Request; your request contains invalid data',
  },
  {
    type: AuthenticationError,
    statusCode: 401,
    errorCode: 'authentication_error',
    errorMessage: 'Unauthenticated; you cannot access this resource',
  },
  {
    type: TokenError,
    statusCode: 404,
    errorCode: 'token_error',
    errorMessage: 'Not found; cannot access token',
  },
  {
    type: DuplicateEmailError,
    statusCode: 400,
    errorCode: 'duplicate_email_error',
    errorMessage: 'Bad Request; duplicate email',
  },
  {
    type: IncorrectEmailFormatError,
    statusCode: 400,
    errorCode: 'incorrect_email_format_error',
    errorMessage: 'Bad Request; email format is bad',
  },
  {
    type: DatabaseError,
    statusCode: 500,
    errorCode: 'database_error',
    errorMessage: 'Internal Server Error; database issue',
  },
];