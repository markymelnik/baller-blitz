import { useAccessToken } from "../../../hooks/stateSelectors";
import { useAcceptFriendRequest } from "../hooks/useAcceptFriendRequest";
import { useIncomingFriendRequest } from "../hooks/useIncomingFriendRequest";
import { useRejectFriendRequest } from "../hooks/useRejectFriendRequest";

import { ReqFriendCard } from "./ReqFriendCard/ReqFriendCard";
import './req-friends.scss';

export const RequestingFriends = () => {
	const accessToken = useAccessToken()!;

	const { data: incomingFriendRequests, isLoading, refetch } = useIncomingFriendRequest(accessToken);
	const { mutate: acceptFriendRequest } = useAcceptFriendRequest(accessToken);
	const { mutate: rejectFriendRequest } = useRejectFriendRequest(accessToken);

	const handleAccept = (requestId: number) => {
		acceptFriendRequest(requestId, {
			onSuccess: () => {
				refetch();
			}
		})
	}

	const handleReject = (requestId: number) => {
    rejectFriendRequest(requestId, {
      onSuccess: () => {
        refetch();
      },
    });
  };

	if (isLoading) {
		return <div className="hello"></div>
	}

	console.log(incomingFriendRequests);

  return (
    <ul className='req-friends-list'>
			<div className="req-friends-title">Requesting Friends</div>
      {incomingFriendRequests.map((friend) => (
        <ReqFriendCard key={friend.id} friend={friend} handleAccept={handleAccept} handleReject={handleReject} />
      ))}
    </ul>
  );
}