export interface UserState {
	userDetails: User | null;
}

export interface User {
	id: number,
	email: string,
	role: string,
}

export interface BackendUser {
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
	isAuthenticated: boolean;
}
