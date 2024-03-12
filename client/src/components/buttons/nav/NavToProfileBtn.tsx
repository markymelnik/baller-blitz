import { Icons } from '../../../lib/Icons.ts';

import { NavigateToButtonCreator } from './NavigateToButtonCreator.tsx';
import './nav-to-btns.scss';

export const NavToProfileBtn = () => {

  return (
    <NavigateToButtonCreator
      toRoute={'/profile'}
      className={'nav-to-profile-btn'}
      buttonText='Profile'>
        <Icons.Profile className='icon' />
    </NavigateToButtonCreator>
  );
};
