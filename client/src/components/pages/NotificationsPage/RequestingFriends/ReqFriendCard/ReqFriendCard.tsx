import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { RequestFriendData } from '../../../../../types/notifTypes';
import './req-friend-card.scss';

interface ReqFriendCard {
  request: RequestFriendData;
  handleAccept: (requestId: number, event: MouseEvent) => void;
  handleReject: (requestId: number, event: MouseEvent) => void;
}

export const ReqFriendCard = ({ request, handleAccept, handleReject }: ReqFriendCard) => {
  const navigate = useNavigate();

  const handleReqFriendCardClick = () => {
    navigate(`/profile/${request.username}`)
  }

  return (
    <li key={request.request_id} className='req-friend-card' onClick={handleReqFriendCardClick}>
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
