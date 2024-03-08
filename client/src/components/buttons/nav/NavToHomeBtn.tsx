import { Icons } from '../../../lib/Icons.ts';

import { NavigateToButtonCreator } from './NavigateToButtonCreator.tsx';
import './nav-to-btns.scss';

export const NavToHomeBtn = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/'}
      className={'nav-to-home-btn'}
      buttonText='Dashboard'
    >
      <Icons.Dashboard />
      </NavigateToButtonCreator>
  );
};
