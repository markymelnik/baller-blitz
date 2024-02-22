import { useRef } from 'react';
import { createPortal } from 'react-dom';

import { useOutsideClick } from '../../../hooks/page/useOutsideClick';
import { useAccessToken } from '../../../hooks/stateSelectors';
import { useDeleteFriend } from '../../pages/UserProfile/DeleteFriend/useDeleteFriend';
import './delete-friend-overlay.scss';
import { UserProfileInfo } from '../../../types/userTypes';
import { useDelayNavigate } from '../../../hooks/page/useDelayNavigate';

type DeleteOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
	userProfile: UserProfileInfo;
};

export const DeleteFriendOverlay = ({ isOpen, onClose, userProfile }: DeleteOverlayProps) => {
	const delayNavigate = useDelayNavigate();
	const overlayRef = useRef(null);
	useOutsideClick(overlayRef, onClose);

	const onSuccess = () => {
		delayNavigate('/friends');
	}

	const accessToken = useAccessToken()!;
	const { mutate: deleteFriend, isLoading } = useDeleteFriend(accessToken, onSuccess);

	const handleDeleteBtnClick = (friendId: number) => {
		deleteFriend(friendId);
	}

	if (isLoading) {
		return <div>loading...</div>
	}

	if (!isOpen) return null;

  return createPortal(
    <div className='portal-wrapper'>
      <div className='delete-friend-overlay' ref={overlayRef}>
				<div className="delete-friend-prompt">Are you sure?</div>
				<div className="delete-friend-btns">
					<button className="df-close-btn" onClick={onClose}>Close</button>
				<button className="dl-confirm-btn" onClick={() => handleDeleteBtnClick(userProfile.id)}>Remove</button>
				</div>
				
			</div>
    </div>, document.getElementById('portal-root')!
  );
}