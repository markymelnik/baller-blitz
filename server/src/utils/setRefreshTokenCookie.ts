import { Response } from 'express';

export function setRefreshTokenCookie(response: Response, refreshToken: string) {
  response.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    path: '/',
    /* secure: false, */
    sameSite: 'lax',
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
}
