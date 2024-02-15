import { useState } from 'react';
import { PiCaretDown, PiCaretUp } from 'react-icons/pi';

import { PredictedGame } from '../../../../types/gameTypes';

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
        <div className='current-text'>Current Predictions</div>
        <PiCaretDown
          size={20}
          className={isCurrentOpen ? `icon` : `rotate-icon`}
        />
      </div>

      {!isCurrentOpen && <div className='prediction-list-divider'></div>}
    
      {isCurrentOpen && (
        <>
          {numberOfPredictedGames < 1 ? (
            <div className='prediction-none'>No predictions made today.</div>
          ) : (
            <ul className='current-predictions-list'>
              {currentPredictedGames.map((game) => (
                <CurrentCard key={game.game_id} gameInfo={game} />
              ))}
              <div className='current-predictions-list-bot'>
                <PiCaretUp size={25} onClick={handleCurrentButtonClick} />
              </div>
            </ul>
          )}

          <div className='prediction-list-divider'></div>
        </>
      )}
    </div>
  );
};
