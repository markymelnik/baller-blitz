import { UserProfileInfo } from '../../../../types/userTypes';
import { RequestButton } from '../../../friends/hooks/RequestButton';
import './profile-intro.scss';

interface ProfileIntroProps {
  userProfile: UserProfileInfo;
}

export const ProfileIntro = ({ userProfile }: ProfileIntroProps) => {
	return (
		<>
		<div className="profile-intro">
			<div className="profile-username">{userProfile.username}</div>
		</div>
		<RequestButton user={userProfile} />
		</>
	)
}