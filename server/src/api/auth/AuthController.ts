import { NextFunction, Request, Response } from "express";
import { DatabaseUser, LoginResponse, LogoutResponse, RequestingUser, SignupResponse } from "../../database/models/userModel";
import { saltAndHashPassword } from "../../utils/auth/saltAndHashPassword";
import { validateLoginCredentials } from "../../utils/auth/validateLoginCredentials";
import { DatabaseQuery } from "../../database/queries/DatabaseQuery";
import { TokenController } from "../token/TokenController";
import { authenticateLoginCredentials } from "../../utils/auth/authenticateLoginCredentials";
import { TokenCreator } from "../token/TokenCreator";
import { ACCESS_TOKEN_SECRET } from "../../env";
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from "../../utils/auth/mailer";

export const AuthController = {
  async signupUserHandler(request: Request, response: Response, next: NextFunction) {
    try {
      const requestingUser: RequestingUser = request.body;
      validateLoginCredentials(requestingUser);

      const saltedAndHashedPassword = await saltAndHashPassword(
        requestingUser.password
      );
      requestingUser.password = saltedAndHashedPassword;

      const databaseUser = await DatabaseQuery.insertUserIntoDB(requestingUser);

      const databaseUserRole: string = await DatabaseQuery.getUserRoleByIdFromDB(
        databaseUser.id
      );

      const verificationToken = jwt.sign(
        { userId: databaseUser.id },
        ACCESS_TOKEN_SECRET,
        { expiresIn: '10min' }
      )

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
        },
        accessToken,
      };

      console.log(responseObject);
      response.status(201).json(responseObject);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  async loginUserHandler(request: Request, response: Response, next: NextFunction) {
    try {
      const requestingUser: RequestingUser = request.body;
      validateLoginCredentials(requestingUser);

      const databaseUser: DatabaseUser = await authenticateLoginCredentials(
        requestingUser
      );

      const databaseUserRole: string = await DatabaseQuery.getUserRoleByIdFromDB(
        databaseUser.id
      );

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
      /* secure: true, */ 
			maxAge: 1,
    });

    const responseObject: LogoutResponse = {
      status: true,
      message: 'Logged out successfully.',
    }
    
    response.status(200).json(responseObject);
  },
};