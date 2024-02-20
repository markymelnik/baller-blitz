import { useAccessToken } from "../../../hooks/stateSelectors";

import { useAcceptFriendRequest } from "./useAcceptFriendRequest";
import { useIncomingFriendRequest } from "./useIncomingFriendRequest";
import { useRejectFriendRequest } from "./useRejectFriendRequest";

export const PendingFriendRequests = () => {
	const accessToken = useAccessToken()!;

	const { data: incomingFriendRequests, isLoading, refetch } = useIncomingFriendRequest(accessToken);
	const { mutate: acceptFriendRequest } = useAcceptFriendRequest(accessToken);
	const { mutate: rejectFriendRequest } = useRejectFriendRequest(accessToken);

	const handleAccept = (requestId) => {
		acceptFriendRequest(requestId, {
			onSuccess: () => {
				refetch();
			}
		})
	}

	const handleReject = (requestId) => {
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
    <ul className='pending-requests'>
      {incomingFriendRequests.map((request) => (
        <li key={request.id} className='unanswered-request'>
          {request.senderName}
          <button onClick={() => handleAccept(request.id)}>Accept</button>
          <button onClick={() => handleReject(request.id)}>Reject</button>
        </li>
      ))}
    </ul>
  );
}