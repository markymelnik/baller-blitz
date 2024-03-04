import { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { useFetchUserStats } from '../../../../hooks/user/useFetchUserStats';
import { Content } from '../../../../lib/Content';
import { UserStatistics } from '../../../../types/userTypes';
import { formatPercent } from '../../../../utils/formatPercent';
import 'react-loading-skeleton/dist/skeleton.css';
import './user-stats.scss';

export const UserStats = () => {

	const userStats = useFetchUserStats()!;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (userStats) {
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
    }
  }, [userStats]);
	
	if (!userStats) {
		return <Skeleton className='user-stats-skeleton'/>
	}

	const { correct_predictions, total_predictions, accuracy_percentage }: UserStatistics = userStats;

  return (
    <SkeletonTheme baseColor='#cccccc' highlightColor='#e6e6e6'>
      {!userStats || isLoading ? (
        <Skeleton className='user-stats-skeleton'/>
      ) : (
        <div className='user-stats'>
          <h2 className='stats-header'>{Content.profile.userStats.title}</h2>
          <div className='stat'>
            <div className='stat-type'>
              <div className='stat-percentage'>
                {formatPercent(accuracy_percentage)}
              </div>
              <div className='stat-title'>
                {Content.profile.userStats.winPrediction}
              </div>
            </div>
            {total_predictions < 1 ? (
              <p>Place predictions to start tracking stats!</p>
            ) : (
              <div className='correct-rate'>
                <div className='correct-pred'>
                  <span>{`${correct_predictions}`}</span>{' '}
                  {Content.userProfile.stats.predicted}
                </div>
                <div className='correct-total'>
                  <span>{`${total_predictions}`}</span>{' '}
                  {Content.userProfile.stats.total}
                </div>
              </div>
            )}
          </div>
          <div className='stat'></div>
        </div>
      )}
    </SkeletonTheme>
  );
};
