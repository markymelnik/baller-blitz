import { useEffect } from "react";

import { useAccessToken } from "../../../hooks/stateSelectors";

import { useFriendRequestStatus } from "./useFriendRequestStatus";
import { useSendFriendRequest } from "./useSendFriendRequest";
import './req-btn.scss';

type RequestButtonProps = {
	user: any;
	onOpen: () => void;
}

export const RequestButton = ({ user, onOpen }: RequestButtonProps ) => {

	const accessToken = useAccessToken()!;

	const { data: friendRequestStatus, refetch } = useFriendRequestStatus(user.id, accessToken);
	const { mutate: sendFriendRequest, isLoading } = useSendFriendRequest(accessToken);

	console.log(friendRequestStatus);

	let buttonText = '';
	if (friendRequestStatus === 'pending') {
		buttonText = 'Request Sent';
	} else if (friendRequestStatus === 'accepted') {
		buttonText = 'Already Friends';
		setTimeout(onOpen, 0);
	} else {
		buttonText = 'Send Request'
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

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		friendRequestStatus !== 'accepted' ? (<button className={`send-req-btn ${friendRequestStatus === 'pending' ? `sent` : ``}`} onClick={handleSendRequest} disabled={friendRequestStatus === 'pending'}>
        {buttonText}
      </button>) : (  <div>Friends</div>)
	)
}