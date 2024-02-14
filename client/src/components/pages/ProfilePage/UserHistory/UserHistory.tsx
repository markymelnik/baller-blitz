import { useState } from 'react';
import { FaBeer } from 'react-icons/fa';

import { PredictedGame } from '../../../../types/gameTypes';

import { HistoryCard } from './HistoryCard/HistoryCard';
import './user_history.scss';
import { PiCaretDown } from 'react-icons/pi';

type UserHistoryProps = {
  allPredictedGames: PredictedGame[];
}

export const UserHistory = ({ allPredictedGames }: UserHistoryProps) => {
  const numberOfPredictedGames = allPredictedGames.length;

  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  const handleHistoryButtonClick = () => {
    setIsHistoryOpen((prev) => !prev);
  };

  return (
    <div className='user-history'>
      <div className='history-header' onClick={handleHistoryButtonClick}>
        <div className='history-text'>Past History</div>
        <PiCaretDown size={20} className={isHistoryOpen ? `icon` : `rotate-icon`} />
      </div>

      {!isHistoryOpen && <div className='prediction-list-divider'></div>}

      {isHistoryOpen && (
        <ul className='history-card-list'>
          {numberOfPredictedGames < 1 ? (
            <div className='history-none'>No History</div>
          ) : (
            allPredictedGames.map((game) => (
              <HistoryCard key={game.game_id} gameInfo={game} />
            ))
          )}
        </ul>
      )}
    </div>
  );
};
