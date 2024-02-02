import { RequestingUser } from "../database/models/userModel";

export function validateLoginCredentials({ email, password }: RequestingUser) {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
}