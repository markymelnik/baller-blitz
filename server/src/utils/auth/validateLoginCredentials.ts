import validator from "validator";
import { RequestingUser } from "../../database/models/userModel";
import { ValidationError } from "../../errors/ErrorClasses";
import { sanitizeEmail } from "./sanitizeEmail";
import { sanitizePassword } from "./sanitizePassword";

export function validateLoginCredentials({ email, password }: RequestingUser) {
  if (!email || !password) {
    throw new ValidationError('Email and password are required')
  }

  const sanitizedEmail = sanitizeEmail(email);
  const sanitizedPassword = sanitizePassword(password);

  if (!validator.isLength(sanitizedPassword, { min: 5, max: 20 })) {
    throw new ValidationError('Wrong email or password')
  }

  return { sanitizedEmail, sanitizedPassword };
}