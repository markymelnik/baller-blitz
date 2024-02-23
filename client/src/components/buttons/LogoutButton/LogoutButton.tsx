import { lazy, useState } from 'react';

import { Content } from '../../../lib/Content.ts';
import { Icons } from '../../../lib/Icons.ts';
import './logout-btn.scss';

const LogoutOverlay = lazy(() => import('../../overlays/LogoutOverlay/LogoutOverlay.tsx'));

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
