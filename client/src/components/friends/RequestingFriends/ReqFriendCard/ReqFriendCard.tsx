import './req-friend-card.scss';

export const ReqFriendCard = ({ friend, handleAccept, handleReject }) => {
  return (
    <li key={friend.id} className='req-friend-card'>
      <div className="req-friend-id">{friend.id}</div>
      <div className="req-friend-status">Status: {friend.status}</div>
      <div className="req-friend-btns">
        <button onClick={() => handleAccept(friend.id)}>Accept</button>
        <button onClick={() => handleReject(friend.id)}>Reject</button>
      </div>
    </li>
  );
};
