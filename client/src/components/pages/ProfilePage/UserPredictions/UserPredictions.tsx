import { useState } from 'react';
import { PiCaretDown } from 'react-icons/pi';

import { PredictedGame } from '../../../../types/gameTypes';

import { CurrentCard } from './CurrentCard/CurrentCard';
import './user-predictions.scss';


type UserPredictionsProps = {
  currentPredictedGames: PredictedGame[];
};

export const UserPredictions = ({ currentPredictedGames }: UserPredictionsProps) => {
  const numberOfPredictedGames = currentPredictedGames.length;

  const [isCurrentOpen, setIsCurrentOpen] = useState<boolean>(false);

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
        <PiCaretDown size={20} className={isCurrentOpen ? `icon` : `rotate-icon`}/>
      </div>

      {!isCurrentOpen && <div className='prediction-list-divider'></div>}

      {isCurrentOpen && (
          <ul className='current-prediction-list'>
            {currentPredictedGames.map((game) => (
              <CurrentCard key={game.game_id} gameInfo={game} />
            ))}
          </ul>
        
      )}
    </div>
  );
};
