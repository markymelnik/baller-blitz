import { Icons } from '../../../lib/Icons.ts';

import { NavigateToButtonCreator } from "./NavigateToButtonCreator.tsx";

export const NavToGamesBtn = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/games'}
      buttonText={'Games'}
      className={'to-games-from-home-btn'}
    >
      <Icons.Basketball size={30} strokeWidth={1.2} className='icon'/>
    </NavigateToButtonCreator>
  );
};