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

export interface AuthResponseObject {
  user: FrontendUser;
  accessToken: string;
}