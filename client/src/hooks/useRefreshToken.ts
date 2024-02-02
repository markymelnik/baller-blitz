import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AuthManager } from '../auth/AuthManager.ts';

export const useRefreshToken = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await AuthManager.renewAccessToken(dispatch);
    };
    fetchToken();
  }, [dispatch]);
};
