import { MouseEvent, useEffect, useState } from "react";
import { ring } from 'ldrs';

import { useAccessToken } from "../../../../hooks/stateSelectors";
import { UserProfileInfo } from "../../../../types/userTypes";
import { Icons } from "../../../../lib/Icons";
import { Content } from "../../../../lib/Content";

import { useFriendRequestStatus } from "./useFriendRequestStatus";
import { useSendFriendRequest } from "./useSendFriendRequest";
import './req-btn.scss';

type RequestButtonProps = {
	user: UserProfileInfo;
	onOpen: () => void;
}

export const RequestButton = ({ user, onOpen }: RequestButtonProps ) => {
  ring.register();

  const accessToken = useAccessToken()!;

  const { data: friendRequestStatus, refetch } = useFriendRequestStatus(
    user.id,
    accessToken
  );
  const { mutate: sendFriendRequest, isLoading: isMutating } =
    useSendFriendRequest(accessToken);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  let buttonText = '';
  if (friendRequestStatus === 'pending') {
    buttonText = 'Friend Request Sent';
  } else if (friendRequestStatus === 'accepted') {
    buttonText = '';
    setTimeout(onOpen, 0);
  } else {
    buttonText = 'Add Friend';
  }

  const handleSendRequest = (event: MouseEvent) => {
    event.stopPropagation();
    setIsLoading(true);
    sendFriendRequest(user.id, {
      onSuccess: () => {
        refetch();
        setTimeout(() => setIsLoading(false), 1000);
      },
    });
  };

  useEffect(() => {
    refetch();
  }, [user.id, refetch]);
  
  if (isLoading || isMutating) {
    return (
      <div className='send-req-btn'>
        <div className='loading-send-req'>
          <l-ring
            size='20'
            stroke='2.5'
            bg-opacity='0'
            speed='2'
            color='var(--spinner-color)'
          ></l-ring>
        </div>
      </div>
    );
  }

  return friendRequestStatus !== 'accepted' ? (
    <button
      className={`send-req-btn ${
        friendRequestStatus === 'pending' ? `sent` : ``
      }`}
      onClick={handleSendRequest}
      disabled={friendRequestStatus === 'pending'}
    >
      {buttonText}
    </button>
  ) : (
    <div className='friends-badge'>
      {Content.friends.title} <span>{<Icons.Check size={16} />}</span>
    </div>
  );
}