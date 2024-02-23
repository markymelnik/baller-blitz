import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { useAccessToken } from '../../../hooks/stateSelectors';
import { ApiClient } from '../../../api/ApiClient';
import { Content } from '../../../lib/Content';

import { DeleteFriendBtn } from './DeleteFriend/DeleteFriendBtn';
import { RequestButton } from './RequestButton/RequestButton';
import { ProfileIntro } from './ProfileIntro/ProfileIntro';
import { ProfileStats } from './ProfileStats/ProfileStats';
import './user-profile.scss';

const fetchUserProfile = async (accessToken: string, username: string) => {
	const response = await ApiClient.fetchUserProfile(accessToken, username);
  return response;
}

const UserProfile = () => {
  const accessToken = useAccessToken()!;
  const { username } = useParams();

  const { data, isLoading, error } = useQuery(['userProfile', username], () =>
    fetchUserProfile(accessToken, username!)
  );
  const { userProfile = {}, userStats = {} } = data || {};

  const [isFriends, setIsFriends] = useState<boolean>(false);

  const confirmFriendStatus = () => {
    setIsFriends(true);
  };

  if (isLoading) {
    return <></>;
  }

  if (error) {
    return <div>{Content.userProfile.error}</div>;
  }

  return (
    <main className='user-profile-container'>
      <ProfileIntro userProfile={userProfile} onOpen={confirmFriendStatus} />
      <RequestButton user={userProfile} onOpen={confirmFriendStatus} />
      {isFriends && <ProfileStats userStats={userStats} />}
      {isFriends && <DeleteFriendBtn userProfile={userProfile} />}
    </main>
  );
};

export default UserProfile;