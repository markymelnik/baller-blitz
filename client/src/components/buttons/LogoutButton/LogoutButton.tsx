import { useDispatch } from 'react-redux';

import { AuthManager } from '../../../auth/AuthManager.ts';
import { AuthenticationError } from '../../../errors/ErrorClasses.ts';
import { handleError } from '../../../errors/handleError.ts';
import { useDelayNavigate } from '../../../hooks/useDelayNavigate.ts';
import './logout-btn.scss';

export const LogoutButton = () => {
  
  const delayNavigate = useDelayNavigate();
	const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      const response = await AuthManager.logoutUser(dispatch);

      if (response.status) {
        delayNavigate('/');
      }
      
    } catch (error) {
      const logoutError = new AuthenticationError('Failed to logout');
      handleError(logoutError);
    }
  };

  return <button className='logout-btn' onClick={handleClick}>Logout</button>;
};
