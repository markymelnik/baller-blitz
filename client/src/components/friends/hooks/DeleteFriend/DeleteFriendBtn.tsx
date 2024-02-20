import { useState } from 'react';

import './delete-friend-btn.scss';
import { DeleteFriendOverlay } from '../../../overlays/DeleteFriendOverlay/DeleteFriendOverlay';
import { UserProfileInfo } from '../../../../types/userTypes';

interface DeleteFriendBtnProps {
  userProfile: UserProfileInfo;
}

export const DeleteFriendBtn = ({ userProfile }: DeleteFriendBtnProps) => {

	const [isDeleteFriendOverlayOpen, setIsDeleteFriendOverlayOpen] = useState<boolean>(false);

	const handleDeleteFriendOverlayClose = () => {
		setIsDeleteFriendOverlayOpen(false);
	}

	const handleDeleteFriendOverlayButtonClick = () => {
    setIsDeleteFriendOverlayOpen((prev) => !prev);
  };
	
	return (
		<div className="delete-friend-container">
<button className="open-delete-friend-btn" onClick={handleDeleteFriendOverlayButtonClick}>
			Remove
		</button>
		<DeleteFriendOverlay isOpen={isDeleteFriendOverlayOpen} onClose={handleDeleteFriendOverlayClose} userProfile={userProfile} />
		</div>
		
	)
}