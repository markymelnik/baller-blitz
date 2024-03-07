import { useState } from 'react';

import { MobileOverlay } from '../../overlays/MobileOverlay/MobileOverlay';
import { Icons } from '../../../lib/Icons';
import './mobile-overlay-btn.scss';

export const MobileOverlayBtn = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button className='mobile-overlay-btn' onClick={() => setIsOpen(prev => !prev)}>
				<Icons.Menu className='icon' />
			</button>
       <MobileOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
