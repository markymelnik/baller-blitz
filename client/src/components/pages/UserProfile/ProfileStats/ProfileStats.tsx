import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { Content } from "../../../../lib/Content"
import { UserStatistics } from "../../../../types/userTypes";
import { formatPercent } from "../../../../utils/formatPercent"
import './profile-stats.scss';


interface UserStatsProps {
  userStats: UserStatistics;
}

export const ProfileStats = ({ userStats }: UserStatsProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (userStats) {
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
    }
  }, [userStats]);
	
	if (!userStats) {
		return <Skeleton className='profile-stats-skeleton'/>
	}

	return (
    <SkeletonTheme baseColor='#cccccc' highlightColor='#e6e6e6'>
      {!userStats || isLoading ? (
        <Skeleton className='profile-stats-skeleton'/>
      ) : (
    <div className='profile-stats'>
      <div className='stats-header'>Stats</div>
      <div className='stat'>
        <div className='stat-type'>
          {+userStats.total_predictions > 0 ? (
            <>
              <div className='stat-percentage'>
                {formatPercent(+userStats.accuracy_percentage)}
              </div>
              <div className='stat-title'>
                {Content.profile.userStats.winPrediction}
              </div>
            </>
          ) : (
            <div className='stat-fallback'>{`No predictions made`}</div>
          )}
        </div>

        {+userStats.total_predictions > 0 && (
          <div className='correct-rate'>
            <div className='correct-pred'>
              <span>{`${userStats.correct_predictions}`}</span>{' '}
              {Content.userProfile.stats.correct}
            </div>
            <div className='correct-total'>
              <span>{`${userStats.total_predictions}`}</span>{' '}
              {Content.userProfile.stats.total}
            </div>
          </div>
        )}
      </div>
    </div> )}
    </SkeletonTheme>
  );
}