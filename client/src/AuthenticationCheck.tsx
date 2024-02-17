import { LoadingScreen } from './components/loading-screen/LoadingScreen';
import { useAuthLoading } from './hooks/stateSelectors';

interface AuthCheckProps {
  children: React.ReactNode;
}

// HANDLE CASE WHERE USER IS DELETED AND IS AUTHENTICATED BUT NO LONGER VERIFIED

const AuthenticationCheck = ({ children }: AuthCheckProps) => {
  const authenticationIsProcessing = useAuthLoading();

	if (authenticationIsProcessing) {
		return <LoadingScreen />
	}
	
  return children;
};

export default AuthenticationCheck;
