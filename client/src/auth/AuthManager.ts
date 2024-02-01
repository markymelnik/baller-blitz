import { ApiClient } from "../api/ApiClient.ts";
import { authenticateUser, unauthenticateUser } from "../redux/slices/authSlice.ts";
import { clearAccessToken, setAccessToken } from "../redux/slices/tokenSlice.ts";
import { clearUserDetails, setUserDetails } from "../redux/slices/userSlice.ts";
import { AppDispatch } from "../redux/store.ts";
import { LoginCredentials, SignupCredentials } from "../types/authTypes.ts";
import { BackendUser } from "../types/userTypes.ts";

export const AuthManager = {
	async signupUser(formData: SignupCredentials) {
		try {
			const responseData: BackendUser = await ApiClient.login('/login', formData);
	
			console.log('Signup successful :)');
			return responseData;
		}
		catch (error) {
			console.log('Signup failed :(', error);
		}
	},

	async loginUser(formData: LoginCredentials, dispatch: AppDispatch) {
		try {
			const responseData: BackendUser = await ApiClient.login('/login', formData);
			const { user, accessToken } = responseData;
	
			dispatch(setAccessToken(accessToken));
			dispatch(authenticateUser());
			dispatch(setUserDetails(user));
	
			console.log('Login successful :)');
			return responseData;
		}
		catch (error) {
			console.error('Login failed :(', error);
		}
	},

	async logoutUser(dispatch: AppDispatch) {
		try {
			await ApiClient.logout('/logout');
	
			dispatch(clearAccessToken());
			dispatch(unauthenticateUser());
			dispatch(clearUserDetails());
	
			console.log('Logout successful :)');
		}
		catch (error) {
			console.error('Logout failed :(')
		}
	},
	
	async renewAccessToken(dispatch: AppDispatch) {
		try {
			const responseData: BackendUser = await ApiClient.retireveAccessToken('/confirm-auth');
			const { user, accessToken } = {...responseData};
	
			dispatch(setAccessToken(accessToken));
			dispatch(authenticateUser());
			dispatch(setUserDetails(user));
	
			return responseData;
		}
		catch (error) {
			console.error('Token renewal unsuccessful', error);
		}
	},
}