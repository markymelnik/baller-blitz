import { UserProfileInfo } from '../../../../types/userTypes';
import './profile-intro.scss';

interface ProfileIntroProps {
  userProfile: UserProfileInfo;
  onOpen: () => void;
}

export const ProfileIntro = ({ userProfile }: ProfileIntroProps) => {
  return (
    <div className='profile-intro'>
      <div className="profile-picture">
        <div className="image"></div>
      </div>
      <h2 className='profile-username'>{userProfile.username}</h2>
    </div>
  );
};
