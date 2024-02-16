import { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { Icons } from '../../../lib/Icons.ts';
import { useFetchAllPredictions } from '../../../hooks/predictions/useFetchAllPredictions.ts';
import { useFetchCurrentPredictions } from '../../../hooks/predictions/useFetchCurrentPredictions.ts';
import { useAuth, useUserDetails } from '../../../hooks/stateSelectors.ts';
import { LogoutButton } from '../../buttons/LogoutButton/LogoutButton.tsx';

import { UserHistory } from './UserHistory/UserHistory.tsx';
import { UserPredictions } from './UserPredictions/UserPredictions.tsx';
/* import AboutUser from './AboutUser/AboutUser.tsx'; */
import { UserStats } from './UserStats/UserStats.tsx';
import './profile-page.scss';

export const ProfilePage = () => {
  const isAuthenticated = useAuth();
  const userDetails = useUserDetails();

  const allPredictedGames = useFetchAllPredictions();
  const currentPredictedGames = useFetchCurrentPredictions();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (userDetails) {
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
    }
  }, [userDetails]);

  if (!isAuthenticated) {
    return <p className='profile-error'>Log In to view profile</p>;
  }

  if (!userDetails) {
    return <p>Loading user details...</p>;
  }

  const { is_verified, username } = userDetails;

  return (
    <SkeletonTheme baseColor='#cccccc' highlightColor='#e6e6e6'>
    <div className='profile-page'>
      <div className='profile-page-top'>
        <div className='profile-container'>
          <div className='profile-photo'></div>
          <div className='profile-details'>
            <div className='profile-username'>
              {username}
            </div>
            <div className="profile-verified">
              <span><Icons.SealCheck size={16} /></span>
              {is_verified && 'Verified'}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="profile-page-divider">
        <div className="divider"></div>
      </div> */}
      <div className='profile-page-bot'>
        <ul className='profile-page-blobs'>
          {isLoading ? (
            <Skeleton className="blob-skeleton-wrapper" count={2} />
          ) : (
            <>
              <UserStats allPredictedGames={allPredictedGames} />
              {/* <AboutUser /> */}
              <UserPredictions currentPredictedGames={currentPredictedGames} />
              <UserHistory allPredictedGames={allPredictedGames} />
            </>
          )}
        </ul>
        <LogoutButton />
      </div>
    </div>
    </SkeletonTheme>
  );
};
