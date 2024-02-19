import { useFetchUserStats } from '../../../../hooks/user/useFetchUserStats';
import { Content } from '../../../../lib/Content';
import { UserStatistics } from '../../../../types/userTypes';
import { formatPercent } from '../../../../utils/formatPercent';
import './user-stats.scss';

export const UserStats = () => {

	const userStats = useFetchUserStats();
	
	if (!userStats) {
		return <p>Loading user stats...</p>;
	}

	const { correct_predictions, total_predictions, accuracy_percentage }: UserStatistics = userStats;

  return (
    <div className='user-stats'>
      <div className='stats-header'>{Content.profile.userStats.title}</div>
      <div className='stat'>
        <div className='stat-type'>
          <div className='stat-percentage'>
            {formatPercent(accuracy_percentage)}
          </div>
          <div className='stat-title'>{Content.profile.userStats.winPrediction}</div>
        </div>
        {total_predictions < 1 ? (
          <></>
        ) : (
          <div className='correct-rate'>
            <div className='correct-pred'>{`${correct_predictions} correct out of ${total_predictions} predictions made`}</div>
          </div>
        )}
      </div>
      <div className='stat'></div>
    </div>
  );
};
