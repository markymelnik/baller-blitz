import { useAuth, useUserDetails } from '../../../hooks/stateSelectors.ts';
import { LogoutButton } from '../../buttons/LogoutButton/LogoutButton.tsx';

/* import AboutUser from './AboutUser/AboutUser.tsx'; */
import { UserStats } from './UserStats/UserStats.tsx';
import './profile-page.scss';

export const ProfilePage = () => {
  const isAuthenticated = useAuth();
  const userDetails = useUserDetails();

  if (!isAuthenticated) {
    return <p className='profile-error'>Log In to view profile</p>;
  }

  if (!userDetails) {
    return <p>Loading user details...</p>;
  }

  const { email } = userDetails;

  return (
    <div className='profile-page'>
      <div className='profile-page-top'>
        <div className='profile-container'>
          <div className='profile-photo'></div>
          <div className='profile-details'>
            <div className='profile-email'>{email}</div>
          </div>
        </div>
      </div>
      <div className='profile-page-bot'>
        <div className='profile-page-blobs'>
          <UserStats />
          {/* <AboutUser /> */}
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};
