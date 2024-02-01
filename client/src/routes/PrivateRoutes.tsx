import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

import { RootState } from '../redux/store.ts';
import { isTokenValid } from '../utils/isTokenValid.ts';
import { useAuth, useUserDetails } from '../hooks/stateSelectors.ts';

type PrivateRoutesProps = {
	allowedRoles: string[];
}

export const PrivateRoutes = ({ allowedRoles }: PrivateRoutesProps) => {
  const isAuthenticated = useAuth();
	const userDetails = useUserDetails();
	const accessToken = useSelector((state: RootState) => state.token.accessToken);

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
