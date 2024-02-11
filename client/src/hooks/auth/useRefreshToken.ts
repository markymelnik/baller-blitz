import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AuthManager } from '../../managers/AuthManager.ts';
import { authenticateUser, startLoading, stopLoading, unauthenticateUser } from '../../redux/slices/authSlice.ts';

export const useRefreshToken = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      dispatch(startLoading());
      try {
        await AuthManager.renewAccessToken(dispatch);
        dispatch(authenticateUser());
      } catch (error) {
        console.error(error);
        dispatch(unauthenticateUser());
      } finally {
        dispatch(stopLoading());
      }
    };
    fetchToken();
  }, [dispatch]);
};
