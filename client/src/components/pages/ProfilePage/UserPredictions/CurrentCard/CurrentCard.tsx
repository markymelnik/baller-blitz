import { PredictedGame } from '../../../../../types/gameTypes';
import { GameDataFormatter } from '../../../../../utils/GameDataFormatter';
import './current-card.scss';

type CurrentCard = {
	gameInfo: PredictedGame;
}

export const CurrentCard = ({ gameInfo }: CurrentCard) => {
  const { game_date, predicted_winner, away_team, home_team } = { ...gameInfo };

  return (
    <li className='current-card'>
      <div className='current-date'>
        {GameDataFormatter.formatDate(game_date)}
      </div>
      <div className='current-matchup'>
        {away_team} vs {home_team}
      </div>
      <div className='current-predicted-winner'>
        Predicted: {predicted_winner}
      </div>
    </li>
  );
};