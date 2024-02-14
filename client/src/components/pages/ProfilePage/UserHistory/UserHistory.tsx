import { useState } from 'react';
import { IconCaretDown, IconCaretUp } from '@tabler/icons-react';

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
      {numberOfPredictedGames < 1 ? (
        <div className='history-fallback'>No history</div>
      ) : (
        <>
          <div className='history-header' onClick={handleHistoryButtonClick}>
            <div className='history-text'>History</div>
            <IconCaretDown stroke={1} size={30} />
          </div>

          {isHistoryOpen && (
            <ul className='history-card-list'>
              {allPredictedGames.map((game) => (
                <HistoryCard key={game.game_id} gameInfo={game} />
              ))}
            </ul>
          )}

          {isHistoryOpen && (
            <div className='history-bottom' onClick={handleHistoryButtonClick}>
              <div className='history-text'>History</div>
              <IconCaretUp stroke={1} size={30} />
            </div>
          )}
        </>
      )}
    </div>
  );
};
