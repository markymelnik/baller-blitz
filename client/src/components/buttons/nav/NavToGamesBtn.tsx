import { Icons } from '../../../lib/Icons.ts';

import { NavigateToButtonCreator } from "./NavigateToButtonCreator.tsx";

export const NavToGamesBtn = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/games'}
      buttonText={'See games'}
      className={'nav-to-games-btn'}
    >
      <Icons.ArrowRight />
    </NavigateToButtonCreator>
  );
};