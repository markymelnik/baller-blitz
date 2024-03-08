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
      <div className="user-profile">
      <ProfileIntro userProfile={userProfile} onOpen={confirmFriendStatus} />
      <div className="user-profile-mid">
        <RequestButton user={userProfile} onOpen={confirmFriendStatus} />
      </div>
      {isFriends && <ProfileStats userStats={userStats} />}
      <div className="user-profile-bot">
      {isFriends && <DeleteFriendBtn userProfile={userProfile} />}
      </div>

      </div>
    
    </main>
  );
};

export default UserProfile;