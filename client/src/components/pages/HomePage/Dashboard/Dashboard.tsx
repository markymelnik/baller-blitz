import { useIsMobile } from '../../../../hooks/page/useIsMobile';
import { useUserDetails } from '../../../../hooks/stateSelectors';
import { UserStats } from '../../ProfilePage/UserStats/UserStats';
import { HomeGames } from '../HomeGames/HomeGames';
import './dashboard.scss';

export const Dashboard = ({ handleNavToGames }: { handleNavToGames?: () => void }) => {
	const userDetails = useUserDetails()!;

  const isMobile = useIsMobile();

  return (
    <div className='dashboard'>
      <div className='home-welcome'>
        <div className='hw-hi'>Hello {userDetails?.username}</div>
        <div className='hw-back'>Welcome back!</div>
      </div>
      <HomeGames handleNavToGamesTab={handleNavToGames} />
      {isMobile && <div className="db-stats-container">
        <UserStats />
      </div>}
  {/*     <div className="home-thing">Container 1</div>
      <div className="home-thing">Container 2</div> */}
    </div>
  );
};