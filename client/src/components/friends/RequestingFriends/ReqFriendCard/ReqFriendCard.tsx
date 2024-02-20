import { useNavigate } from 'react-router-dom';
import './req-friend-card.scss';

export const ReqFriendCard = ({ request, handleAccept, handleReject }) => {
  const navigate = useNavigate();

  const handleReqFriendCardClick = () => {
    navigate(`/profile/${request.username}`)
  }

  return (
    <li key={request.id} className='req-friend-card' onClick={handleReqFriendCardClick}>
      <div className='req-friend-card-left'></div>
      <div className='req-friend-card-right'>
        <div className='req-friend-username'>{request.username}</div>
        <div className='req-friend-id'>{request.user_id}</div>

        <div className='req-friend-btns'>
          <button onClick={(event) => handleAccept(request.request_id, event)}>Accept</button>
          <button onClick={(event) => handleReject(request.request_id, event)}>Reject</button>
        </div>
      </div>
    </li>
  );
};
