export interface RequestingUser {
  email: string,
  password: string,
}

export interface DatabaseUser {
  id: number;
  email: string;
  password: string;
}

export interface FrontendUser {
  id: number;
  email: string;
}

export interface UserResponseObject {
  token: string,
  user: FrontendUser;
}
