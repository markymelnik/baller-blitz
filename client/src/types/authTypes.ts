export interface SignupCredentials {
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  isLoggedIn: boolean;
}

export interface AccessToken {
  accessToken: string | null;
}
