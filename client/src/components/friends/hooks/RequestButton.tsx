import { useEffect } from "react";

import { useAccessToken } from "../../../hooks/stateSelectors";

import { useFriendRequestStatus } from "./useFriendRequestStatus";
import { useSendFriendRequest } from "./useSendFriendRequest";
import './req-btn.scss';

type RequestButtonProps = {
	user: any;
}

export const RequestButton = ({ user }: RequestButtonProps ) => {

	const accessToken = useAccessToken()!;

	const { data: friendRequestStatus, refetch } = useFriendRequestStatus(user.id, accessToken);
	const { mutate: sendFriendRequest, isSuccess, isLoading } = useSendFriendRequest(accessToken);

	console.log(friendRequestStatus);

	let buttonText = 'Send Request'
	if (friendRequestStatus === 'pending') {
		buttonText = 'Request Sent';
	} else if (friendRequestStatus === 'accepted') {
		buttonText = 'Already Friends'
	}

	const handleSendRequest = (event) => {
		event.stopPropagation();
		sendFriendRequest(user.id, {
			onSuccess: () => {
				refetch(user.id);
			}
		})
	}

	useEffect(() => {
    refetch();
  }, [user.id, refetch]);

	return (
		<button className={`send-req-btn ${friendRequestStatus === 'pending' ? `sent` : ``}`} onClick={handleSendRequest} disabled={friendRequestStatus === 'pending'}>
        {buttonText}
      </button>
	)
}