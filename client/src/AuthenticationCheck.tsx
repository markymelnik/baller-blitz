import { useEffect } from 'react';

import { LoadingScreen } from './components/loading-screen/LoadingScreen';
import { useVerify } from './hooks/auth/useVerify';
import { useDelayNavigate } from './hooks/page/useDelayNavigate';
import { useAuth, useAuthLoading } from './hooks/stateSelectors';

interface AuthCheckProps {
  children: React.ReactNode;
}

// HANDLE CASE WHERE USER IS DELETED AND IS AUTHENTICATED BUT NO LONGER VERIFIED

const AuthenticationCheck = ({ children }: AuthCheckProps) => {
  const authenticationIsProcessing = useAuthLoading();
	const isVerified = useVerify();
	const isAuthenticated = useAuth();

	const delayNavigate = useDelayNavigate();

	if (authenticationIsProcessing) {
		return <LoadingScreen />
	}
	
  return children;
};

export default AuthenticationCheck;
