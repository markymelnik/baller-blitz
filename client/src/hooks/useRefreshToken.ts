import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AuthManager } from '../auth/AuthManager.ts';

export const useRefreshToken = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        await AuthManager.renewAccessToken(dispatch);
      } catch (error) {
        console.error('Failed to refresh token', error);
      }
    };
    fetchToken();
  }, [dispatch]);
};
