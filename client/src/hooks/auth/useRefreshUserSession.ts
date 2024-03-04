import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AuthManager } from '../../managers/AuthManager.ts';
import { authenticateUser, unauthenticateUser } from '../../redux/slices/authSlice.ts';
import { BackendUser } from '../../types/userTypes.ts';

export const useRefreshUserSession = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response: BackendUser | undefined = await AuthManager.refreshUserSession(dispatch);
      /*   console.log(response); */

        if (response && 'message' in response && response.message === 'Refresh token not found') {
          dispatch(unauthenticateUser());
        } else {
          dispatch(authenticateUser());
        }
      } catch (error) {
        console.error(error);
        dispatch(unauthenticateUser());
      }
    };
    fetchToken();
  }, [dispatch]);
};
