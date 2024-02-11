import validator from "validator";
import { RequestingUser } from "../../database/models/userModel";
import { ValidationError } from "../../errors/ErrorClasses";

function sanitizeEmail (email: string) {
  email = email.trim().toLowerCase();
  if (!validator.isEmail(email)) {
    throw new ValidationError('This email format does not work. Try again.')
  }
  return email;
}

function sanitizePassword (password: string) {
  password = password.trim();
  return password;
}

export function validateLoginCredentials({ email, password }: RequestingUser) {
  if (!email || !password) {
    throw new ValidationError('Email and password are required.')
  }

  const sanitizedEmail = sanitizeEmail(email);
  const sanitizedPassword = sanitizePassword(password);

  if (!validator.isLength(sanitizedPassword, { min: 5, max: 20 })) {
    throw new ValidationError('Password must be at least 10 characters long.')
  }

  return { sanitizedEmail, sanitizedPassword };
}