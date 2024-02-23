import { Icons } from '../../../lib/Icons.ts';

import { NavigateToButtonCreator } from "./NavigateToButtonCreator.tsx";

export const NavToGamesBtn = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/games'}
      buttonText={'Games'}
      className={'nav-to-games-btn'}
    >
      <Icons.Basketball size={40} strokeWidth={1.2} className='icon'/>
    </NavigateToButtonCreator>
  );
};