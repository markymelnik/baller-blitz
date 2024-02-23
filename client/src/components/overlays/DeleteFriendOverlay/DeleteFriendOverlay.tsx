import { useRef } from 'react';
import { createPortal } from 'react-dom';

import { useOutsideClick } from '../../../hooks/page/useOutsideClick';
import { useAccessToken } from '../../../hooks/stateSelectors';
import { useDeleteFriend } from '../../pages/UserProfile/DeleteFriend/useDeleteFriend';
import './delete-friend-overlay.scss';
import { UserProfileInfo } from '../../../types/userTypes';
import { useDelayNavigate } from '../../../hooks/page/useDelayNavigate';
import { OverlayCloseButton } from '../OverlayCloseButton/OverlayCloseButton';
import { Content } from '../../../lib/Content';

type DeleteOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
	userProfile: UserProfileInfo;
};

const DeleteFriendOverlay = ({ isOpen, onClose, userProfile }: DeleteOverlayProps) => {
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
		return <></>;
	}

	if (!isOpen) return null;

  return createPortal(
    <div className='df-portal-wrapper'>
      <div className='delete-friend-overlay' ref={overlayRef} role="dialog">
				<OverlayCloseButton onClose={onClose} />
				<div className="delete-friend-prompt">{Content.common.areYouSure}</div>
				<div className='delete-friend-overlay-message'>{Content.common.confirm}</div>
				<div className="delete-friend-btns">
					<button className="df-close-btn" onClick={onClose}>Close</button>
				<button className="df-confirm-btn" onClick={() => handleDeleteBtnClick(userProfile.id)}>{Content.common.remove}</button>
				</div>
				
			</div>
    </div>, document.getElementById('portal-root')!
  );
}
export default DeleteFriendOverlay;