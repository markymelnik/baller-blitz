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

export interface SignupSuccessResponse {
  status: boolean;
  message: string;
}

export interface SignupErrorResponse {
  error: string;
  message: string;
}

export interface LoadingState {
	isLoading: boolean;
}
