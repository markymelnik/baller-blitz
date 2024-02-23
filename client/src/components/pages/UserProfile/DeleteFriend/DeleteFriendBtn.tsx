import { lazy, useState } from 'react';

import { UserProfileInfo } from '../../../../types/userTypes';
import { Content } from '../../../../lib/Content';
import './delete-friend-btn.scss';

const DeleteFriendOverlay = lazy(() => import('../../../overlays/DeleteFriendOverlay/DeleteFriendOverlay'));

interface DeleteFriendBtnProps {
  userProfile: UserProfileInfo;
}

export const DeleteFriendBtn = ({ userProfile }: DeleteFriendBtnProps) => {
  const [isDeleteFriendOverlayOpen, setIsDeleteFriendOverlayOpen] =
    useState<boolean>(false);

  const handleDeleteFriendOverlayClose = () => {
    setIsDeleteFriendOverlayOpen(false);
  };

  const handleDeleteFriendOverlayButtonClick = () => {
    setIsDeleteFriendOverlayOpen((prev) => !prev);
  };

  return (
    <div className='delete-friend-container'>
      <button
        className='open-delete-friend-btn'
        onClick={handleDeleteFriendOverlayButtonClick}
      >
        {Content.common.unfriend}
      </button>
      <DeleteFriendOverlay
        isOpen={isDeleteFriendOverlayOpen}
        onClose={handleDeleteFriendOverlayClose}
        userProfile={userProfile}
      />
    </div>
  );
}