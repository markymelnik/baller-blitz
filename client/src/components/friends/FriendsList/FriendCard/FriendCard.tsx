import './friend-card.scss';

export const FriendCard = ({ friend }) => {
  return (
    <div className='friend-card'>
			<div className="friend-id">{friend.id}</div>
      <div className='friend-status'>Status: {friend.status}</div>
    </div>
  );
};