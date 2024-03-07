import { useAuthorizedRender } from '../../../../hooks/auth/useAuthorizedRender';
import { useAccessToken } from '../../../../hooks/stateSelectors';
import { Content } from '../../../../lib/Content';
import { FriendListCard } from '../../../../types/notifTypes';
import { NavToSearchBtn } from '../../../buttons/nav/NavToSearchBtn';
import { useFriends } from '../../UserProfile/RequestButton/useFriends';

import { FriendCard } from './FriendCard/FriendCard';
import './friends-list.scss';

export const FriendsList = () => {
  const accessToken = useAccessToken()!;

  const { data: friends, isLoading } = useFriends(accessToken);

  const AuthenticatedNavToFriendsBtn = useAuthorizedRender(NavToSearchBtn, [
    'user',
    'admin',
  ]);

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="friends-container">
      {friends.length > 0 && <div className='friends-list-title'>{Content.friends.title} <span>({friends.length})</span></div>}
      {friends.length < 1 ? (
        <div className='no-friends-fallback'>
          <div className='fallback-text'>{Content.friends.fallback}</div>
          <AuthenticatedNavToFriendsBtn />
        </div>
      ) : (
        <ul className='friends-list'>
          {friends.map((friend: FriendListCard) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </ul>
      )}
  </div>
  );
}