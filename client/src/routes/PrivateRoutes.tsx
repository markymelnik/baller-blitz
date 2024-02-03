import { Outlet, Navigate } from 'react-router-dom';

import { isTokenValid } from '../utils/isTokenValid.ts';
import { useAccessToken, useAuth, useUserDetails } from '../hooks/stateSelectors.ts';
import { AllowedRoles } from '../types/roleTypes.ts';

export const PrivateRoutes = ({ allowedRoles }: AllowedRoles) => {
  const isAuthenticated = useAuth();
	const userDetails = useUserDetails();
	const accessToken = useAccessToken();

	const isTokenCurrentlyValid = accessToken ? isTokenValid(accessToken) : false;

	if (!isAuthenticated || !isTokenCurrentlyValid) {
		return <Navigate to='/unauthenticated' />
	}

	if (!userDetails) {
		throw new Error('Error retrieving user details');
	}

	const isAuthorized = allowedRoles.includes(userDetails.role);

	if (!isAuthorized) {
		return <Navigate to='/unauthorized' />
	}

	return <Outlet />;
};
