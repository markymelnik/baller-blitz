import { Content } from "../../../../lib/Content"
import { UserStatistics } from "../../../../types/userTypes";
import { formatPercent } from "../../../../utils/formatPercent"
import './profile-stats.scss';

interface UserStatsProps {
  userStats: UserStatistics;
}

export const ProfileStats = ({ userStats }: UserStatsProps) => {
	return (
		<div className='profile-stats'>
      <div className='stats-header'>{Content.profile.userStats.title}</div>
      <div className='stat'>
        <div className='stat-type'>
          <div className='stat-percentage'>
            {formatPercent(+userStats.accuracy_percentage)}
          </div>
          <div className='stat-title'>{Content.profile.userStats.winPrediction}</div>
        </div>
        {+userStats.total_predictions < 1 ? (
          <></>
        ) : (
          <div className='correct-rate'>
            <div className='correct-pred'>{`${userStats.correct_predictions} correct out of ${userStats.total_predictions} predictions made`}</div>
          </div>
        )}
      </div>
      
    </div>
	)
}