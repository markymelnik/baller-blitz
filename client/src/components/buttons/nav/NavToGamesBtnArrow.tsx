import { Icons } from '../../../lib/Icons.ts';

import { NavigateToButtonCreator } from "./NavigateToButtonCreator.tsx";
import './nav-to-btns.scss';

export const NavToGameBtnArrow = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/games'}
      buttonText={'See games'}
      className={'nav-to-games-btn-arr'}
    >
      <Icons.ArrowRight />
    </NavigateToButtonCreator>
  );
};