export type User = {
	email: string,
	password: string
}

export type SignupCredentials = {
	email: string,
	password: string,
}

export type LoginCredentials = {
	email: string,
	password: string,
}

export interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
}
