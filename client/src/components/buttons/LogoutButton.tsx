import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AuthManager } from '../../auth/AuthManager.ts';

export const LogoutButton = () => {
  const navigate = useNavigate();
	const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      await AuthManager.logoutUser(dispatch);
      
      navigate('/');

    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return <button onClick={handleClick}>Logout</button>;
};
