import { useState } from 'react';
import { IconCaretDown } from '@tabler/icons-react';

import { PredictedGame } from '../../../../types/gameTypes';

import { CurrentCard } from './CurrentCard/CurrentCard';
import './user-predictions.scss';

type UserPredictionsProps = {
  currentPredictedGames: PredictedGame[];
};

export const UserPredictions = ({
  currentPredictedGames,
}: UserPredictionsProps) => {
  const numberOfPredictedGames = currentPredictedGames.length;

  const [isCurrentOpen, setIsCurrentOpen] = useState<boolean>(false);

  const handleCurrentButtonClick = () => {
    setIsCurrentOpen((prev) => !prev);
  };

  return (
    <div className='user-predictions'>
      {numberOfPredictedGames < 1 ? (
        <div className='user-pred-fallback'>
          You have no current predictions!
        </div>
      ) : (
        <>
          <div
            className='current-predictions-header'
            onClick={handleCurrentButtonClick}
          >
            <div className='current-text'>Current Predictions</div>
            <IconCaretDown stroke={1} size={30} />
          </div>

          {isCurrentOpen && (
            <>
            <div className="prediction-list-divider"></div>
            <ul className='current-prediction-list'>
              {currentPredictedGames.map((game) => (
                <CurrentCard key={game.game_id} gameInfo={game} />
              ))}
            </ul>
            </>

            
          )}
        </>
      )}
    </div>
  );
};
