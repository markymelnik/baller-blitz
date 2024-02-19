import { UserProfileInfo } from '../../../../types/userTypes';
import './profile-intro.scss';

interface ProfileIntroProps {
  userProfile: UserProfileInfo;
}

export const ProfileIntro = ({ userProfile }: ProfileIntroProps) => {
	console.log(userProfile);
	return (
		<div className="profile-intro">
			<div className="profile-username">{userProfile.username}</div>
		</div>
	)
}