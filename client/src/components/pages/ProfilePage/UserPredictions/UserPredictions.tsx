import { useState } from 'react';

import { Icons } from '../../../../lib/Icons';
import { PredictedGame } from '../../../../types/gameTypes';
import { Content } from '../../../../lib/Content';

import { CurrentCard } from './CurrentCard/CurrentCard';
import './user-predictions.scss';

type UserPredictionsProps = {
  currentPredictedGames: PredictedGame[];
};

export const UserPredictions = ({ currentPredictedGames }: UserPredictionsProps) => {
  const [isCurrentOpen, setIsCurrentOpen] = useState<boolean>(false);

  const numberOfPredictedGames = currentPredictedGames.length;

  const handleCurrentButtonClick = () => {
    setIsCurrentOpen((prev) => !prev);
  };

  return (
    <div className='user-predictions'>
      <div
        className='current-predictions-header'
        onClick={handleCurrentButtonClick}
      >
        <h3 className='current-text'>{Content.profile.currentPredictions.title}</h3>
        <Icons.ArrowDown
          size={20}
          className={isCurrentOpen ? `icon` : `rotate-icon`}
        />
      </div>
    
      {isCurrentOpen && (
        <>
          {numberOfPredictedGames < 1 ? (
            <div className='prediction-none'>{Content.profile.currentPredictions.none}</div>
          ) : (
            <ul className='current-predictions-list'>
              {currentPredictedGames.map((game) => (
                <CurrentCard key={game.game_id} gameInfo={game} />
              ))}
              <div className='current-predictions-list-bot'>
                <Icons.ArrowUp size={25} onClick={handleCurrentButtonClick} />
              </div>
            </ul>
          )}
        </>
      )}
    </div>
  );
};
