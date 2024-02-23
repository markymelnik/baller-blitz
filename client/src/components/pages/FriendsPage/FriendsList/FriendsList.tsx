import { useAuthorizedRender } from '../../../../hooks/auth/useAuthorizedRender';
import { useAccessToken } from '../../../../hooks/stateSelectors';
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
    return <div>loading...</div>;
  }

  return (
    <>
      <div className='friends-list-title'>Friends <span>{friends.length > 0 && (`(${friends.length})`)}</span></div>
      {friends.length < 1 ? (
        <div className='no-friends-fallback'>
          <div className='fallback-text'>Search for friends!</div>
          <AuthenticatedNavToFriendsBtn />
        </div>
      ) : (
        <ul className='friends-list'>
          {friends.map((friend: FriendListCard) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </ul>
      )}
    </>
  );
}