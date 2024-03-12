import { useAccessToken } from '../../../hooks/stateSelectors.ts';
import { Icons } from '../../../lib/Icons.ts';
import { useIncomingFriendRequest } from '../../pages/NotificationsPage/RequestingFriends/useIncomingFriendRequest.tsx';

import { NavigateToButtonCreator } from "./NavigateToButtonCreator.tsx";

export const NavToNotifBtn = () => {

  const accessToken = useAccessToken()!;

	const { data: incomingFriendRequests, isLoading } = useIncomingFriendRequest(accessToken);

  if (isLoading) {
    return <></>;
  }

  const numberOfNotifs = incomingFriendRequests.length;

  return (
    <NavigateToButtonCreator
      toRoute={'/notifications'}
      className={'nav-to-notif-btn'}
    >
      {numberOfNotifs > 0 && <span className='number-of-notifs'>{numberOfNotifs}</span>}
      <Icons.Bell className='icon'/>
    </NavigateToButtonCreator>
  );
};