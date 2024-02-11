import { useState } from 'react';
import { IconCaretDown } from '@tabler/icons-react';

import { useFetchAllPredictions } from '../../../../hooks/predictions/useFetchAllPredictions';

import { HistoryCard } from './HistoryCard/HistoryCard';
import './user_history.scss';

export const UserHistory = () => {
  const allPredictedGames = useFetchAllPredictions();

  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  const handleHistoryButtonClick = () => {
    setIsHistoryOpen((prev) => !prev);
  };

  return (
    <div className='user-history'>
      <div className='history-header' onClick={handleHistoryButtonClick}>
				<div className="history-text">History</div>
				<IconCaretDown stroke={1} size={30} />
      </div>
      {isHistoryOpen && (
        <ul className='history-card-list'>
          {allPredictedGames.map((game) => (
            <HistoryCard key={game.game_id} gameInfo={game} />
          ))}
        </ul>
      )}
    </div>
  );
};
