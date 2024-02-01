export interface User {
	id: number,
	email: string,
	role: string,
}

export interface UserState {
	userDetails: User | null,
}

export interface BackendUser {
	user: User,
	accessToken: string,
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
	isAuthenticated: boolean,
}

export interface AccessToken {
	accessToken: string | null,
}
