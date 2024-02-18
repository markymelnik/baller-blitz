import validator from "validator";
import { RequestingUser } from "../../database/models/userModel";
import { ValidationError } from "../../errors/ErrorClasses";
import { sanitizeEmail } from "./sanitizeEmail";
import { sanitizePassword } from "./sanitizePassword";

export function validateSignupCredentials({ email, password }: RequestingUser) {
  if (!email || !password) {
    throw new ValidationError('Email and password are required');
  }

  const sanitizedEmail = sanitizeEmail(email);
  const sanitizedPassword = sanitizePassword(password);

  if (!validator.isLength(sanitizedPassword, { min: 10, max: 20 })) {
    throw new ValidationError('Bad password');
  }

  if (!/[A-Z]/.test(sanitizedPassword)) {
    throw new ValidationError('Bad password');
  }

  if (!/[a-z]/.test(sanitizedPassword)) {
    throw new ValidationError('Bad password');
  }

  if (!/\d/.test(sanitizedPassword)) {
    throw new ValidationError('Bad password');
  }

  return { sanitizedEmail, sanitizedPassword };
}