import { Icons } from '../../../lib/Icons.ts';

import { NavigateToButtonCreator } from "./NavigateToButtonCreator.tsx";

export const NavToNotifBtn = () => {
  return (
    <NavigateToButtonCreator
      toRoute={'/notifications'}
      className={'nav-to-notif-btn'}
    >
      <Icons.Bell size={30} />
    </NavigateToButtonCreator>
  );
};