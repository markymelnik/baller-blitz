import { NextFunction, Request, Response } from "express";
import { DatabaseUser, LoginResponse, LogoutResponse, RequestingUser, SignupResponse } from "../database/models/userModel";
import { saltAndHashPassword } from "../utils/auth/saltAndHashPassword";
import { DatabaseQuery } from "../database/queries/DatabaseQuery";
import { TokenController } from "./token/TokenController";
import { authenticateLoginCredentials } from "../utils/auth/authenticateLoginCredentials";
import { TokenCreator } from "./token/TokenCreator";
import { ACCESS_TOKEN_SECRET, FRONTEND_URL } from "../env";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { sendVerificationEmail } from "../utils/auth/mailer";
import { validateSignupCredentials } from "../utils/auth/validateSignupCredentials";
import { validateLoginCredentials } from "../utils/auth/validateLoginCredentials";
import { sanitizeEmail } from "../utils/auth/sanitizeEmail";

export const AuthController = {
  async signupUserHandler(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const requestingUser: RequestingUser = request.body;
      validateSignupCredentials(requestingUser);

      const saltedAndHashedPassword = await saltAndHashPassword(
        requestingUser.password
      );
      requestingUser.password = saltedAndHashedPassword;

      const randomUsername = `User${Math.floor(Math.random() * 100000).toString().padStart(8, '0')}`;
      requestingUser.username = randomUsername;

      const databaseUser = await DatabaseQuery.insertUserIntoDB(requestingUser);

      const databaseUserRole: string =
        await DatabaseQuery.getUserRoleByIdFromDB(databaseUser.id);

      const verificationToken = jwt.sign(
        { userId: databaseUser.id },
        ACCESS_TOKEN_SECRET,
        { expiresIn: '15min' }
      );

      await sendVerificationEmail(requestingUser.email, verificationToken);

      const accessToken = TokenCreator.generateAccessToken({
        userId: databaseUser.id,
      });
      const refreshToken = TokenCreator.generateRefreshToken({
        userId: databaseUser.id,
      });

      TokenController.setRefreshTokenCookie(response, refreshToken);

      const responseObject: SignupResponse = {
        user: {
          id: databaseUser.id,
          email: databaseUser.email,
          role: databaseUserRole,
          is_verified: databaseUser.is_verified,
          username: databaseUser.username,
        },
        accessToken,
      };

      response.status(201).json(responseObject);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  async loginUserHandler(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const requestingUser: RequestingUser = request.body;
      validateLoginCredentials(requestingUser);

      const databaseUser: DatabaseUser = await authenticateLoginCredentials(
        requestingUser
      );

      const databaseUserRole: string =
        await DatabaseQuery.getUserRoleByIdFromDB(databaseUser.id);

      const accessToken = TokenCreator.generateAccessToken({
        userId: databaseUser.id,
      });
      const refreshToken = TokenCreator.generateRefreshToken({
        userId: databaseUser.id,
      });

      TokenController.setRefreshTokenCookie(response, refreshToken);

      const responseObject: LoginResponse = {
        user: {
          id: databaseUser.id,
          email: databaseUser.email,
          role: databaseUserRole,
          is_verified: databaseUser.is_verified,
          username: databaseUser.username,
        },
        accessToken,
      };

      response.status(200).send(responseObject);
    } catch (error) {
      next(error);
    }
  },

  logoutUserHandler(request: Request, response: Response) {
    response.cookie('refreshToken', '', {
      httpOnly: true,
      secure: true,
      maxAge: 1,
    });

    const responseObject: LogoutResponse = {
      status: true,
      message: 'Logged out successfully.',
    };

    response.status(200).json(responseObject);
  },

  async emailCheckHandler(request: Request, response: Response, next: NextFunction) {
    try {
      const { email } = request.body;

      sanitizeEmail(email);
      
      const user = await DatabaseQuery.findUserByEmailFromDB(email);

      if (user) {
        return response.status(400).json({ error: 'Email already in use'})
      } else {
        return response.status(200).json({ emailExists: false })
      }
    } catch (error) {
      next(error);
    }
  },

  async resendEmailVerificationHandler(request: Request, response: Response) {
    const userId = request.user.id;

    try {
      const databaseUser = await DatabaseQuery.findUserByIdFromDB(+userId);

      const verificationToken = jwt.sign(
        { userId: databaseUser.id },
        ACCESS_TOKEN_SECRET,
        { expiresIn: '15min' }
      );

      const accessToken = TokenCreator.generateAccessToken({
        userId: databaseUser.id,
      });
      const refreshToken = TokenCreator.generateRefreshToken({
        userId: databaseUser.id,
      });

      TokenController.setRefreshTokenCookie(response, refreshToken);

      const res = await sendVerificationEmail(databaseUser.email, verificationToken);
      
      response.redirect('http://localhost:5173/verify-success');

    } catch (error) {
      console.error('Error in resendEmailVerificationHandler:', error);
    response.status(500).send({ error: 'Failed to send verification email.' });
    }
  },

  async verifyEmailHandler (request: Request, response: Response) {
    const { token } = request.query;
  
    if (!token || typeof token !== 'string') {
      return response.status(400).send('Verification token is required');
    }
  
    try {
      const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET as string) as JwtPayload;
      const userId = decoded.userId;
  
      const emailVerified= await DatabaseQuery.markEmailVerifiedInDB(userId);
      if (!emailVerified) {
        return response.status(404).send('User not found or could not verify email.');
      }
  
      const databaseUser: DatabaseUser = await DatabaseQuery.findUserByIdFromDB(userId);
      if (!databaseUser) {
        return response.status(404).send('User not found.');
      }
  
      const databaseUserRole: string = await DatabaseQuery.getUserRoleByIdFromDB(
        databaseUser.id
      );
      if (!databaseUserRole) {
        return response.status(404).send('User role not found.');
      }
  
      const accessToken = TokenCreator.generateAccessToken({
        userId: databaseUser.id,
      });
      const refreshToken = TokenCreator.generateRefreshToken({
        userId: databaseUser.id,
      });
  
      TokenController.setRefreshTokenCookie(response, refreshToken);
  
      const responseObject: LoginResponse = {
        user: {
          id: databaseUser.id,
          email: databaseUser.email,
          role: databaseUserRole,
          is_verified: databaseUser.is_verified,
          username: databaseUser.username,
        },
        accessToken,
      };
  
      response
        .redirect(`${FRONTEND_URL}/verify-success`);
  
    } catch (error) {
      response.status(401).send('Invalid or expired token');
    }
  }
};