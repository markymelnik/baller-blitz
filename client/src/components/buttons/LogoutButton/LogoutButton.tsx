import { useState } from 'react';
import { PiSignOut } from 'react-icons/pi';

import { LogoutOverlay } from '../../overlays/LogoutOverlay/LogoutOverlay.tsx';
import './logout-btn.scss';

export const LogoutButton = () => {
  const [isLogoutOverlayOpen, setIsLogoutOverlayOpen] = useState<boolean>(false);

  const handleLogoutOverlayClose = () => {
    setIsLogoutOverlayOpen(false);
  };

  const handleLogoutOverlayButtonClick = () => {
    setIsLogoutOverlayOpen((prev) => !prev);
  };

  return (
    <div className='logout-container'>
      <button
        className='open-overlay-btn'
        onClick={handleLogoutOverlayButtonClick}
      >
        <PiSignOut size={20} />
        <div className='open-btn-text'>Logout</div>
      </button>
      
      <LogoutOverlay
        isOpen={isLogoutOverlayOpen}
        onClose={handleLogoutOverlayClose}
      />
    </div>
  );
};
