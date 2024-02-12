import { Role } from "./roleModel";

export interface RequestingUser {
  email: string;
  password: string;
}

export interface DatabaseUser {
  id: number;
  email: string;
  password: string;
  role: Role;
  is_verified: boolean;
}

export interface FrontendUser {
  id: number;
  email: string;
  role: string;
  is_verified: boolean;
}

export interface LoginResponse {
  user: FrontendUser;
  accessToken: string;
}

export interface SignupResponse {
  user: FrontendUser;
  accessToken: string
}

export interface LogoutResponse {
  status: boolean;
  message: string;
}
