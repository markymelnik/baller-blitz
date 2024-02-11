import { AllowedRoles } from '../../types/roleTypes.ts';
import { isTokenValid } from '../../utils/isTokenValid.ts';
import { useAccessToken, useAuth, useUserDetails } from '../stateSelectors.ts';

export const useAuthorize = ({ allowedRoles }: AllowedRoles) => {
	const isLoggedIn = useAuth();
	const userDetails = useUserDetails();
	const accessToken = useAccessToken();

	const isTokenCurrentlyValid = accessToken ? isTokenValid(accessToken) : false;

	const isAuthenticated = isLoggedIn && isTokenCurrentlyValid && userDetails;
	const isAuthorized =  isAuthenticated && allowedRoles.includes(userDetails.role);

	return { isAuthenticated, isAuthorized };
};
