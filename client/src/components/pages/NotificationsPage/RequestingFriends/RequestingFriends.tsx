import { MouseEvent } from "react";

import { useAcceptFriendRequest } from "../../../RequestButton/useAcceptFriendRequest";
import { useRejectFriendRequest } from "../../../RequestButton/useRejectFriendRequest";
import { useAuthorizedRender } from "../../../../hooks/auth/useAuthorizedRender";
import { useAccessToken } from "../../../../hooks/stateSelectors";
import { RequestFriendData } from "../../../../types/notifTypes";
import { NavToSearchBtn } from "../../../buttons/nav/NavToSearchBtn";

import { useIncomingFriendRequest } from "./useIncomingFriendRequest";
import { ReqFriendCard } from "./ReqFriendCard/ReqFriendCard";
import './req-friends.scss';

export const RequestingFriends = () => {
	const accessToken = useAccessToken()!;

	const { data: incomingFriendRequests, isLoading, refetch } = useIncomingFriendRequest(accessToken);
	const { mutate: acceptFriendRequest } = useAcceptFriendRequest(accessToken);
	const { mutate: rejectFriendRequest } = useRejectFriendRequest(accessToken);

	const AuthenticatedNavToFriendsBtn = useAuthorizedRender(NavToSearchBtn, ['user','admin']);

	const handleAccept = (requestId: number, event: MouseEvent) => {
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

	const handleReject = (requestId: number, event: MouseEvent) => {
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

	console.log(incomingFriendRequests)

  return (
		<div className='req-friends-container'>
			<div className='req-friends-title'>
				Friend Requests <span>{incomingFriendRequests > 0 && (`(${incomingFriendRequests.length})`)}</span>
			</div>
			{incomingFriendRequests.length < 1 ? (
				<div className='no-req-friends-fallback'>
					<div className='fallback-text'>Search for friends!</div>
					<AuthenticatedNavToFriendsBtn />
				</div>
			) : (
				<ul className='req-friends-list'>
					{incomingFriendRequests.map((request: RequestFriendData) => (
						<ReqFriendCard
							key={request.request_id}
							request={request}
							handleAccept={handleAccept}
							handleReject={handleReject}
						/>
					))}
				</ul>
			)}
		</div>
	);
	
}