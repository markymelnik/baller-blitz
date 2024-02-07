import { IconUserCircle } from '@tabler/icons-react';

import { NavigateToButtonCreator } from './NavigateToButtonCreator.tsx';
import './nav-to-btns.scss';

export const NavigateToProfileButton = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/profile'}
      className={'nav-to-profile-btn'}>
        <IconUserCircle size={45} stroke={0.8} />
    </NavigateToButtonCreator>
  );
};
