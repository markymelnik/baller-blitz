import { useFetchUserStats } from '../../../../hooks/useFetchUserStats';
import { Content } from '../../../../lib/Content';
import { PredictedGame } from '../../../../types/gameTypes';
import { UserStatistics } from '../../../../types/userTypes';
import './user-stats.scss';

function formatPercent(percentage: number) {
	return `${Math.round(percentage * 10) / 10}%`;
}

type UserStatsProps = {
  allPredictedGames: PredictedGame[];
}

export const UserStats = ({ allPredictedGames }: UserStatsProps) => {

	const numberOfPredictedGames = allPredictedGames.length;

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
        {numberOfPredictedGames < 1 ? (
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
