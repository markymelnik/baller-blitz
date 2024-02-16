import { Icons } from '../../../lib/Icons.ts';

import { NavigateToButtonCreator } from './NavigateToButtonCreator.tsx';
import './nav-to-btns.scss';

export const NavigateToProfileButton = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/profile'}
      className={'nav-to-profile-btn'}>
        <Icons.Profile size={30} />
    </NavigateToButtonCreator>
  );
};
