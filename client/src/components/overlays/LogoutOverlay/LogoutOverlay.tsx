import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';

import { useDelayNavigate } from '../../../hooks/page/useDelayNavigate';
import { useOutsideClick } from '../../../hooks/page/useOutsideClick';
import { AuthManager } from '../../../managers/AuthManager';
import { handleError } from '../../../errors/handleError';
import { AuthenticationError } from '../../../errors/ErrorClasses';
import './logout-overlay.scss';

type LogoutOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const LogoutOverlay = ({ isOpen, onClose }: LogoutOverlayProps) => {
  const overlayRef = useRef(null);

  const delayNavigate = useDelayNavigate();
  const dispatch = useDispatch();

  useOutsideClick(overlayRef, onClose);

  const handleLogoutButtonClick = async () => {
    try {
      const response = await AuthManager.logoutUser(dispatch);

      onClose();

      if (response.status) {
        delayNavigate('/');
      }
    } catch (error) {
      const logoutError = new AuthenticationError('Failed to logout');
      handleError(logoutError);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className='logout-portal-wrapper'>
      <div className='logout-overlay' ref={overlayRef}>
        <div className='logout-overlay-graphic'>You are you sure?</div>
        <div className='logout-overlay-message'>Confirm</div>
        <div className='logout-overlay-btns'>
          <button className='close-logout-overlay-btn'>
            <div className='close-btn-text' onClick={onClose}>
              Close
            </div>
          </button>
          <button className='logout-btn' onClick={handleLogoutButtonClick}>
            <div className='logout-btn-text'>Logout</div>
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('portal-root')!
  );
};
