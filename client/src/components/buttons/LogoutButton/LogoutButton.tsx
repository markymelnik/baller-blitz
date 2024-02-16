import { useState } from 'react';

import { LogoutOverlay } from '../../overlays/LogoutOverlay/LogoutOverlay.tsx';
import './logout-btn.scss';
import { Content } from '../../../lib/Content.ts';
import { Icons } from '../../../lib/Icons.ts';

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
        <Icons.Logout size={20} />
        <div className='open-btn-text'>{Content.auth.logout.title}</div>
      </button>
      
      <LogoutOverlay
        isOpen={isLogoutOverlayOpen}
        onClose={handleLogoutOverlayClose}
      />
    </div>
  );
};
