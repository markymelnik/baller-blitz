import { Profile } from '../components/Profile/Profile.tsx';
import { NavigateToHomeButton } from '../components/buttons/NavigateToHomeButton.tsx';

export const ProfilePage = () => {

  return (
    <div className='profile-page'>
      <Profile />
      <NavigateToHomeButton />
    </div>
  );
};
