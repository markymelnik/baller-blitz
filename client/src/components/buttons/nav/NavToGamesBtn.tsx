import { Icons } from '../../../lib/Icons.ts';

import { NavigateToButtonCreator } from "./NavigateToButtonCreator.tsx";

export const NavToGamesBtn = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/games'}
      className={'nav-to-games-btn'}
    >
      <Icons.Basketball size={32}  strokeWidth={1.2} />
    </NavigateToButtonCreator>
  );
};