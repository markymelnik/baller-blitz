import { Role } from "./roleModel";

export interface RequestingUser {
  email: string,
  password: string,
}

export interface DatabaseUser {
  id: number;
  email: string;
  password: string;
  role: Role;
}

export interface FrontendUser {
  id: number;
  email: string;
  role: string;
}

export interface LoginResponse {
  user: FrontendUser;
  accessToken: string;
}

export interface SignupResponse {
  status: boolean;
  message: string;
}
