import { useState } from 'react';
import { PiCaretDown, PiCaretUp } from 'react-icons/pi';

import { PredictedGame } from '../../../../types/gameTypes';

import { HistoryCard } from './HistoryCard/HistoryCard';
import './user_history.scss';

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
        <PiCaretDown
          size={20}
          className={isHistoryOpen ? `icon` : `rotate-icon`}
        />
      </div>

      {!isHistoryOpen && <div className='prediction-list-divider'></div>}

      {isHistoryOpen && (
        <>
          {numberOfPredictedGames < 1 ? (
            <div className='history-none'>No History</div>
          ) : (
            <div className='history-card-list'>
              {allPredictedGames.map((game) => (
                <HistoryCard key={game.game_id} gameInfo={game} />
              ))}
              <div className='history-card-list-bot'>
                <PiCaretUp size={25} onClick={handleHistoryButtonClick} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
