import { Icons } from '../../../lib/Icons.ts';

import { NavigateToButtonCreator } from './NavigateToButtonCreator.tsx';
import './nav-to-btns.scss';

export const NavToHomeBtn = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/'}
      className={'nav-to-home-btn'}
    >
      <Icons.ArrowLeft size={28} />    
      </NavigateToButtonCreator>
  );
};
