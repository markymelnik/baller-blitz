import { Icons } from '../../../../../lib/Icons';
import { PredictedGame } from '../../../../../types/gameTypes';
import { GameDataFormatter } from '../../../../../utils/GameDataFormatter';
import './history_card.scss';

type HistoryCard = {
  gameInfo: PredictedGame;
};

export const HistoryCard = ({ gameInfo }: HistoryCard) => {
  const { game_date, predicted_winner, is_correct, away_team, home_team } = {...gameInfo};

  return (
    <li className={`history-card ${is_correct ? `correct` : `incorrect`}`}>
      <div className='history-game-outcome'>
        {is_correct ? <Icons.Check size={25} /> : <Icons.Close size={25} />}
      </div>
      <div className='history-game-id'>{`${GameDataFormatter.formatDate(
        game_date
      )}`}</div>
      <div className='history-game-matchup'>
        <div className="hg-team">{away_team}</div>
        <div className="hg-team">{home_team}</div>
      </div>
      <div className='history-game-choice'>Prediction: {predicted_winner}</div>
      <div className='history-game-winner'>
        Winner:{' '}
        {GameDataFormatter.getHistoryWinner(
          predicted_winner,
          is_correct,
          away_team,
          home_team
        )}
      </div>
    </li>
  );
};
