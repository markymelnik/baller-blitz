import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AuthManager } from '../../managers/AuthManager.ts';
import { authenticateUser, unauthenticateUser } from '../../redux/slices/authSlice.ts';

export const useRefreshUserSession = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await AuthManager.refreshUserSession(dispatch);
        if (response.message === 'Refresh token not found') {
          dispatch(unauthenticateUser());
        } else {
          dispatch(authenticateUser());
        }
        console.log(response);
      } catch (error) {
        console.error(error);
        dispatch(unauthenticateUser());
      }
    };
    fetchToken();
  }, [dispatch]);
};
