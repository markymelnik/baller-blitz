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
      <Icons.Basketball size={75} strokeWidth={1.2} /* className='icon' *//>
      <Icons.ArrowUpRight size={70} strokeWidth={0.5} className='up-right-arr' />
    </NavigateToButtonCreator>
  );
};