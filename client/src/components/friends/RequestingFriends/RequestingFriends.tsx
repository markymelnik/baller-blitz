import { useAuthorizedRender } from "../../../hooks/auth/useAuthorizedRender";
import { useAccessToken } from "../../../hooks/stateSelectors";
import { NavToSearchBtn } from "../../buttons/nav/NavToSearchBtn";
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

	const AuthenticatedNavToFriendsBtn = useAuthorizedRender(NavToSearchBtn, ['user','admin']);

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

	console.log(incomingFriendRequests.length);

  return incomingFriendRequests.length < 1 ? (
    <div className='no-req-friends-fallback'>
      <div className='fallback-text'>Search for friends!</div>
			<AuthenticatedNavToFriendsBtn />
    </div>
  ) : (
    <ul className='req-friends-list'>
      {incomingFriendRequests.map((request) => (
        <ReqFriendCard
          key={request.request_id}
          request={request}
          handleAccept={handleAccept}
          handleReject={handleReject}
        />
      ))}
    </ul>
  );
}