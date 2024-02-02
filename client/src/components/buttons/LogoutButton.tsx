import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AuthManager } from '../../auth/AuthManager.ts';
import { AuthenticationError } from '../../errors/ErrorClasses.ts';
import { handleError } from '../../errors/handleError.ts';

export const LogoutButton = () => {
  const navigate = useNavigate();
	const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      await AuthManager.logoutUser(dispatch);
      
      navigate('/');

    } catch (error) {
      const logoutError = new AuthenticationError('Failed to logout');
      handleError(logoutError);
    }
  };

  return <button onClick={handleClick}>Logout</button>;
};
