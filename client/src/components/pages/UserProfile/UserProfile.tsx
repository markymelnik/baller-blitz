import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { ApiClient } from '../../../api/ApiClient';
import { useAccessToken } from '../../../hooks/stateSelectors';
import './user-profile.scss';

const fetchUserProfile = async (accessToken: string, username: string) => {
	const response = await ApiClient.fetchUserProfile(accessToken, username);
  return response;
}

export const UserProfile = () => {
	const accessToken = useAccessToken()!;
	const { username } = useParams();

	const { data, isLoading, error } = useQuery(['userProfile', username], () => fetchUserProfile(accessToken, username!));

	const { userProfile, userStats } = { ...data };

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

	return (
		<div className="user-profile-container">
			<div className="user-profile-top">
			{userProfile.username}
			</div>
			<div className="user-profile-stats">
				<div className="total-pred">Total Predictions: {userStats.total_predictions}</div>
				<div className="correct-pred">Correct Predictions: {userStats.correct_predictions}</div>
				<div className="win-accuracy">Win Accuracy: {userStats.accuracy_percentage}</div>
			</div>
		</div>
	)
}