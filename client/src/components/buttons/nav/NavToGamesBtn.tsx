import { Content } from '../../../lib/Content.ts';
import { Icons } from '../../../lib/Icons.ts';

import { NavigateToButtonCreator } from "./NavigateToButtonCreator.tsx";

export const NavToGamesBtn = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/games'}
      buttonText={Content.games.title}
      className={'nav-to-games-btn'}
    >
      <Icons.Basketball size={40} strokeWidth={1.2} className='icon'/>
    </NavigateToButtonCreator>
  );
};