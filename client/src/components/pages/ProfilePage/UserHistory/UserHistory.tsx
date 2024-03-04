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
    <div className='user-history' onClick={handleHistoryButtonClick}>
      <div className='history-header'>
        <h3 className='history-text'>{Content.profile.historyPredictions.title}</h3>
        <button className="history-open">
        <Icons.ArrowDown
          size={20}
          className={isHistoryOpen ? `icon` : `rotate-icon`}
        />
        </button>
        
      </div>

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
                <button className="history-close">
                <Icons.ArrowUp size={25} onClick={handleHistoryButtonClick} />
                </button>
                
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
