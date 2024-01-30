export interface User {
	id: number,
	email: string,
}

export interface AuthenticatedUser {
	token: string,
	user: User,
}

export interface SignupCredentials {
	email: string,
	password: string,
}

export interface LoginCredentials {
	email: string,
	password: string,
}

export interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
}
