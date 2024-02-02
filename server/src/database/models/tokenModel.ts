import { JwtPayload } from "jsonwebtoken";

export interface AccessTokenProps extends JwtPayload {
	userId: number,
}

export interface RefreshTokenProps extends JwtPayload {
  userId: number; 
}