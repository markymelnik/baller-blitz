import { useNavigate } from 'react-router-dom';
import './friend-card.scss';

export const FriendCard = ({ friend }) => {
  const navigate = useNavigate();

  const handleFriendCardClick = () => {
    navigate(`/profile/${friend.username}`)
  }
  
  return (
    <div className='friend-card' onClick={handleFriendCardClick}>
      <div className="friend-card-left"></div>
      <div className="friend-card-right"><div className='friend-username'>{friend.username}</div><div className="friend-id">{friend.id}</div>
      </div>
			
    </div>
  );
};