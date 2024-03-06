import { useUserDetails } from '../../../../hooks/stateSelectors';
import { HomeGames } from '../HomeGames/HomeGames';
import './dashboard.scss';

export const Dashboard = () => {
	const userDetails = useUserDetails()!;
  return (
    <div className='dashboard'>
      <div className='home-welcome'>
        <div className='hw-hi'>Hi {userDetails?.username}</div>
        <div className='hw-back'>Welcome back!</div>
      </div>
      <HomeGames />
    </div>
  );
};