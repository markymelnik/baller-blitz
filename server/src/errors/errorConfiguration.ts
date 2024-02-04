import { AuthenticationError, DatabaseError, DuplicateEmailError, IncorrectEmailFormatError, ValidationError } from "./ErrorClasses";

export const errorConfiguration = [
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
    statusCode: 400,
    errorCode: 'database_error',
    errorMessage: 'Bad Request; email format is bad',
  },
];