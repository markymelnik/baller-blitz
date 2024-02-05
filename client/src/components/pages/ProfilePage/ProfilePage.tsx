import { LogoutButton } from '../../buttons/LogoutButton/LogoutButton.tsx';
import { NavigateToFrontButton } from '../../buttons/nav/NavigateToFrontButton.tsx';

import { UserProfile } from './UserProfile/UserProfile.tsx';
import './profile-page.scss';

export const ProfilePage = () => {

  return (
    <div className='profile-page'>
      <UserProfile />
      <NavigateToFrontButton />
      <LogoutButton />
    </div>
  );
};
