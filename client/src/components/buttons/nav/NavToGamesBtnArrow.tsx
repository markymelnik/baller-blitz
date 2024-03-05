import { Icons } from '../../../lib/Icons.ts';

import { NavigateToButtonCreator } from "./NavigateToButtonCreator.tsx";
import './nav-to-btns.scss';

export const NavToGameBtnArrow = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/games'}
      buttonText={'Games'}
      className={'nav-to-games-btn-arr'}
    >
      <Icons.ArrowRight size={20} strokeWidth={2}/>
    </NavigateToButtonCreator>
  );
};