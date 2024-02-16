import { Navigate, Outlet } from "react-router-dom";

import { useAccessToken, useAuth } from "../hooks/stateSelectors.ts"
import { isTokenValid } from "../utils/isTokenValid.ts";

export const PublicRoutes = () => {
	const isAuthenticated = useAuth();
	const accessToken = useAccessToken();

	const isTokenCurrentlyValid = accessToken ? isTokenValid(accessToken) : false;

	if (isAuthenticated && isTokenCurrentlyValid) {
		return <Navigate to='/' />
	}

	return <Outlet />
}