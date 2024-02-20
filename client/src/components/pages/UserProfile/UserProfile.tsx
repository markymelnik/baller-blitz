import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { ApiClient } from '../../../api/ApiClient';
import { useAccessToken } from '../../../hooks/stateSelectors';

import './user-profile.scss';
import { ProfileStats } from './ProfileStats/ProfileStats';
import { ProfileIntro } from './ProfileIntro/ProfileIntro';

const fetchUserProfile = async (accessToken: string, username: string) => {
	const response = await ApiClient.fetchUserProfile(accessToken, username);
  return response;
}

export const UserProfile = () => {
	const accessToken = useAccessToken()!;
	const { username } = useParams();

	const { data, isLoading, error } = useQuery(['userProfile', username], () => fetchUserProfile(accessToken, username!));
	const { userProfile = {}, userStats = {} } = data || {};

	const [isFriends, setIsFriends] = useState<boolean>(false);

	console.log(userProfile);
	
	const confirmFriendStatus = () => {
		setIsFriends(true);
	}

	console.log(isFriends);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

	return (
		<div className="user-profile-container">
			<ProfileIntro userProfile={userProfile} onOpen={confirmFriendStatus} />
			{isFriends && <ProfileStats userStats={userStats} />}
		</div>
	)
}