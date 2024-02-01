import { useAuth, useUserDetails } from '../../hooks/stateSelectors.ts';
import './profile.scss';

export const Profile = () => {

  const isAuthenticated = useAuth();
  const userDetails = useUserDetails();

  if (!isAuthenticated) {
    return <p className='profile-error'>Log In to view profile</p>;
  }

  if (!userDetails) {
    return <p>Loading user details...</p>
  }

  const { id, email, role } = userDetails;

  return (
    <div className='profile-container'>
      <div className="profile-message">Welcome, {role}</div>
      <div className="profile-details">
        <div className='profile-email'>Email: {email}</div>
        <div className="profile-id">Id: {id} </div>
      </div>
    </div>
  );
};
