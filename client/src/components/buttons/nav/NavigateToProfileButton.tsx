import { PiUser } from 'react-icons/pi';

import { NavigateToButtonCreator } from './NavigateToButtonCreator.tsx';
import './nav-to-btns.scss';

export const NavigateToProfileButton = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/profile'}
      className={'nav-to-profile-btn'}>
        <PiUser size={30} />
    </NavigateToButtonCreator>
  );
};
