import { useAccessToken } from '../../../hooks/stateSelectors';
import { useFriends } from '../hooks/useFriends';

import { FriendCard } from './FriendCard/FriendCard';
import './friends-list.scss';

export const FriendsList = () => {
  const accessToken = useAccessToken()!;

  const { data: friends, isLoading } = useFriends(accessToken);

  if (isLoading) {
    return <div>loading...</div>;
  }

  console.log(friends);
  return (
    <div className='friends-list'>
      <div className='friends-list-title'>Friends</div>
      {friends.map((friend) => (
        <FriendCard key={friend.id} friend={friend} />
      ))}
    </div>
  );
}