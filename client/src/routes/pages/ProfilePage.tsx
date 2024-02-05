import { Profile } from '../../components/Profile/Profile.tsx';
import { LogoutButton } from '../../components/buttons/LogoutButton/LogoutButton.tsx';
import { NavigateToFrontButton } from '../../components/buttons/nav/NavigateToFrontButton.tsx';

export const ProfilePage = () => {

  return (
    <div className='profile-page'>
      <Profile />
      <NavigateToFrontButton />
      <LogoutButton />
    </div>
  );
};
