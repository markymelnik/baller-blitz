import { useState } from 'react';

import { Icons } from '../lib/Icons';
import './top-banner.scss';

export const TopBanner = () => {
  const [isHidden, setIsHidden] = useState<boolean>(false);

  const handleClose = () => {
    setIsHidden(true);
  };
	
  return (
    <div className={`top-banner ${isHidden ? `hide` : ``}`}>
      <div className='banner-message'>
        <Icons.Warning />
        <p>This site is under development</p>
      </div>
      <button className='close-banner-btn' onClick={handleClose}>
        <Icons.Close size={20} />
      </button>
    </div>
  );
};
