import validator from "validator";
import { ValidationError } from "../../errors/ErrorClasses";

export function sanitizeEmail (email: string) {
  email = email.trim().toLowerCase();
  if (!validator.isEmail(email)) {
    throw new ValidationError('This email format does not work. Try again.')
  }
  return email;
}