import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';

import { useDelayNavigate } from '../../../hooks/page/useDelayNavigate';
import { useOutsideClick } from '../../../hooks/page/useOutsideClick';
import { AuthManager } from '../../../managers/AuthManager';
import { handleError } from '../../../errors/handleError';
import { AuthenticationError } from '../../../errors/ErrorClasses';
import './logout-overlay.scss';
import { Content } from '../../../lib/Content';
import { OverlayCloseButton } from '../OverlayCloseButton/OverlayCloseButton';

type LogoutOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LogoutOverlay = ({ isOpen, onClose }: LogoutOverlayProps) => {
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
      <div className='logout-overlay' ref={overlayRef} role="dialog">
      <OverlayCloseButton onClose={onClose} />
        <div className='logout-overlay-graphic'>{Content.common.areYouSure}</div>
        <div className='logout-overlay-message'>{Content.common.confirm}</div>
        <div className='logout-overlay-btns'>
          <button className='close-logout-overlay-btn' onClick={onClose}>
            <div className='close-btn-text'>
              {Content.common.close}
            </div>
          </button>
          <button className='logout-btn' onClick={handleLogoutButtonClick}>
            <div className='logout-btn-text'>{Content.auth.logout.title}</div>
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('portal-root')!
  );
};

export default LogoutOverlay;