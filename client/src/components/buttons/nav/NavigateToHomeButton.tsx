import { IconHome } from '@tabler/icons-react';

import { NavigateToButtonCreator } from './NavigateToButtonCreator.tsx';
import './nav-to-btns.scss';

export const NavigateToHomeButton = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/'}
      /* buttonText={'Home'} */
      className={'nav-to-home-btn'}
    >
      <IconHome size={42} stroke={0.8} />
    </NavigateToButtonCreator>
  );
};
