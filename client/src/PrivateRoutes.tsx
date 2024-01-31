import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

import { RootState } from './redux/store.ts';

type PrivateRoutesProps = {
	allowedRoles: string[];
}

export const PrivateRoutes = ({ allowedRoles }: PrivateRoutesProps) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
	const loggedInUser = useSelector((state: RootState) => state.user.userDetails);

	if (!isAuthenticated) {
		return <Navigate to='/unauthenticated' />
	}

	if (!loggedInUser) {
		throw new Error('Error retrieving user details');
	}

	const isAuthorized = allowedRoles.includes(loggedInUser.role);

	if (!isAuthorized) {
		return <Navigate to='/unauthorized' />
	}

	return <Outlet />;
};
