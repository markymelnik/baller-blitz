import { useDispatch } from 'react-redux';
import { FaArrowRightFromBracket } from 'react-icons/fa6';

import { AuthManager } from '../../../managers/AuthManager.ts';
import { AuthenticationError } from '../../../errors/ErrorClasses.ts';
import { handleError } from '../../../errors/handleError.ts';
import { useDelayNavigate } from '../../../hooks/page/useDelayNavigate.ts';
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

  return (
    <button className='logout-btn' onClick={handleClick}>
      <FaArrowRightFromBracket />
      <div className='logout-btn-text'>Logout</div>
    </button>
  );
};
