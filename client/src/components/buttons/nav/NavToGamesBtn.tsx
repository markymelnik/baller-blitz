/* import { Icons } from '../../../lib/Icons.ts'; */

import { NavigateToButtonCreator } from "./NavigateToButtonCreator.tsx";

export const NavToGamesBtn = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/games'}
      className={'nav-to-games-btn'}
      buttonText={'Games'}
    >
  {/*     <Icons.Stack size={32} /> */}
    </NavigateToButtonCreator>
  );
};