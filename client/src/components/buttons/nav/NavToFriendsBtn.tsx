import { Icons } from '../../../lib/Icons.ts';

import { NavigateToButtonCreator } from "./NavigateToButtonCreator.tsx";

export const NavToFriendsBtn = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/friends'}
      className={'nav-to-friends-btn'}
    >
      <Icons.Users size={32} className='icon'/>
    </NavigateToButtonCreator>
  );
};