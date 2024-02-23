import { UserProfileInfo } from '../../../../types/userTypes';
import './profile-intro.scss';

interface ProfileIntroProps {
  userProfile: UserProfileInfo;
  onOpen: () => void;
}

export const ProfileIntro = ({ userProfile }: ProfileIntroProps) => {
  return (
    <div className='profile-intro'>
      <h1 className='profile-username'>{userProfile.username}</h1>
    </div>
  );
};
