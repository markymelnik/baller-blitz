import { useEffect, useState } from 'react';

import { useAuth, useUserDetails } from '../stateSelectors';

export const useVerify = () => {
  const isAuthenticated = useAuth();
  const userDetails = useUserDetails();

  const [isVerified, setIsVerified] = useState<boolean>(false);

  useEffect(() => {
    /* console.log({ isAuthenticated, isVerified}) */
    const verifyUser = () => {
      if (isAuthenticated && userDetails?.is_verified) {
        setIsVerified(true);
      } else {
        setIsVerified(false);
      }
    };
    verifyUser();
  }, [isAuthenticated, userDetails, isVerified]);

  return isVerified;
};
