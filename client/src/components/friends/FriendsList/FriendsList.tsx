import { useAuthorizedRender } from '../../../hooks/auth/useAuthorizedRender';
import { useAccessToken } from '../../../hooks/stateSelectors';
import { NavToSearchBtn } from '../../buttons/nav/NavToSearchBtn';
import { useFriends } from '../hooks/useFriends';

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
    <div className='friends-list-title'>Friends</div>
      {friends.length < 1 ? (
        <div className='no-friends-fallback'>
          <div className='fallback-text'>Search for friends!</div>
          <AuthenticatedNavToFriendsBtn />
        </div>
      ) : (
        <div className='friends-list'>
          {friends.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
      )}
    </>
  );
}