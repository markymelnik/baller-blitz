import { Icons } from '../../../lib/Icons.ts';

import { NavigateToButtonCreator } from "./NavigateToButtonCreator.tsx";

export const NavToReqFriendsBtn = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/req-friends'}
      className={'nav-to-req-friends-btn'}
    >
      <Icons.UserAdd size={30} />
    </NavigateToButtonCreator>
  );
};