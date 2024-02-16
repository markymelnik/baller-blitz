import { useState } from 'react';

import { Icons } from '../../../../lib/Icons';
import { PredictedGame } from '../../../../types/gameTypes';
import { Content } from '../../../../lib/Content';

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
        <div className='history-text'>{Content.profile.historyPredictions.title}</div>
        <Icons.ArrowDown
          size={20}
          className={isHistoryOpen ? `icon` : `rotate-icon`}
        />
      </div>

      {!isHistoryOpen && <div className='prediction-list-divider'></div>}

      {isHistoryOpen && (
        <>
          {numberOfPredictedGames < 1 ? (
            <div className='history-none'>{Content.profile.historyPredictions.none}</div>
          ) : (
            <div className='history-card-list'>
              {allPredictedGames.map((game) => (
                <HistoryCard key={game.game_id} gameInfo={game} />
              ))}
              <div className='history-card-list-bot'>
                <Icons.ArrowUp size={25} onClick={handleHistoryButtonClick} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
