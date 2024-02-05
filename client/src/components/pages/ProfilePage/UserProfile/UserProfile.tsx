import { useAuth, useUserDetails } from '../../../../hooks/stateSelectors.ts';
import './user-profile.scss';

export const UserProfile = () => {

  const isAuthenticated = useAuth();
  const userDetails = useUserDetails();

  if (!isAuthenticated) {
    return <p className='profile-error'>Log In to view profile</p>;
  }

  if (!userDetails) {
    return <p>Loading user details...</p>
  }

  const { email } = userDetails;

  return (
    <div className='profile-container'>
      <div className="profile-message">Hey, {`${email}`.slice(0, 1).toUpperCase()}</div>
      <div className="profile-details">
        <div className='profile-email'>{email}</div>
      </div>
    </div>
  );
};
