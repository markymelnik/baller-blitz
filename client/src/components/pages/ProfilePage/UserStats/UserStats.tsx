import { useFetchUserStats } from '../../../../hooks/useFetchUserStats';
import { UserStatistics } from '../../../../types/userTypes';
import './user-stats.scss';

function formatPercent(percentage: number) {
	return `${Math.round(percentage * 10) / 10}%`;
}

export const UserStats = () => {
	const userStats = useFetchUserStats();
	
	if (!userStats) {
		return <p>Loading user stats...</p>;
	}

	const { correct_predictions, total_predictions, accuracy_percentage }: UserStatistics = userStats;

  return (
    <div className='user-stats'>
      <div className='stats-header'>User Stats</div>
      <div className='stat'>
        <div className='stat-type'>
					<div className="stat-percentage">{formatPercent(accuracy_percentage)}</div>
					<div className="stat-title">Win Prediction</div>
				</div>
        <div className='correct-rate'>
					<div className="correct-pred">{`${correct_predictions} correct out of ${total_predictions} predictions made`}</div>
				</div>
      </div>
      <div className='stat'></div>
    </div>
  );
};
