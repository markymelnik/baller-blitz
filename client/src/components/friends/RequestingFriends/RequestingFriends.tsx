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

	const handleAccept = (requestId: number, event) => {
		event.stopPropagation();
		console.log('hit accept')
		console.log(requestId);
		acceptFriendRequest(requestId, {
			onSuccess: () => {
				console.log('success accept')
				refetch();
			}
		})
	}

	const handleReject = (requestId: number, event) => {
		event.stopPropagation();
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
      {incomingFriendRequests.map((request) => (
        <ReqFriendCard key={request.request_id} request={request} handleAccept={handleAccept} handleReject={handleReject} />
      ))}
    </ul>
  );
}