import { useNavigate } from 'react-router-dom';

import { FriendListCard } from '../../../../../types/notifTypes';
import './friend-card.scss';

interface FriendCardProps {
  friend: FriendListCard;
}
export const FriendCard = ({ friend }: FriendCardProps) => {
  const navigate = useNavigate();

  const handleFriendCardClick = () => {
    navigate(`/profile/${friend.username}`)
  }
  
  return (
    <li className='friend-card' onClick={handleFriendCardClick}>
      <div className="friend-card-left"></div>
      <div className="friend-card-right"><div className='friend-username'>{friend.username}</div><div className="friend-id">{friend.id}</div>
      </div>
    </li>
  );
};