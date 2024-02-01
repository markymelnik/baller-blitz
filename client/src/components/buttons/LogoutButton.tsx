import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logoutUser } from '../../api/logoutUser.ts';

export const LogoutButton = () => {
  const navigate = useNavigate();
	const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      await logoutUser(dispatch);
      
      navigate('/');

    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return <button onClick={handleClick}>Logout</button>;
};
