import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import 'dotenv/config';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

if (!ACCESS_TOKEN_SECRET) {
  throw new Error('Access token secret is undefined');
}

export const validateToken = (request: Request, response: Response, next: () => void) => {
  const token = request.cookies.jwt;
  
  if (!token) {
    return response.status(401).json({ message: 'No token provided' });
  }

  try {
    jwt.verify(token, ACCESS_TOKEN_SECRET);
    next();
  } catch (error) {
    console.error('Failed to validate token', error);

    if (error instanceof jwt.TokenExpiredError) {
      return response.status(401).json({ message: 'Token expired' });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return response.status(401).json({ message: 'Invalid token' });
    }

    return response.status(500).json({ message: 'Failed to authenticate token' });
  }
};
