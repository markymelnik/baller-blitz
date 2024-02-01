import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { refreshToken } from "../refreshToken.ts";
import { setAccessToken } from "../redux/slices/tokenSlice.ts";
import { setAuthentication } from "../redux/slices/authSlice.ts";
import { setUser } from "../redux/slices/userSlice.ts";
import { BackendUser } from "../types.ts";

export const useRefreshToken = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchToken = async () => {
			try {
				const responseObject: BackendUser = await refreshToken();
				const { accessToken, user } = {...responseObject};

				dispatch(setAccessToken(accessToken));
				dispatch(setAuthentication(true));
				dispatch(setUser(user));
			}
			catch (error) {
				console.error('Failed to refresh token', error);
			}
		}
		fetchToken();
	}, [dispatch])
}