import { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { GameCard } from '../GameCard/GameCard';
import { useGetGamesToday } from '../../../../hooks/games/useGetGamesToday';
import { useGetCurrentPredictions } from '../../../../hooks/predictions/useGetCurrentPredictions';
import { useGamesToday } from '../../../../hooks/stateSelectors';
import 'react-loading-skeleton/dist/skeleton.css';
import './list-of-games-today.scss';

export const ListOfGamesToday = () => {
  useGetGamesToday();
  const predictedGames = useGetCurrentPredictions()!;

  const todaysGames = useGamesToday();
  const numberOfGames = todaysGames.length;

  const [gamesState, setGamesState] = useState<string>('NOT_STARTED');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (todaysGames) {
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
    }
  }, [todaysGames]);

  useEffect(() => {
    if (!todaysGames || todaysGames.length === 0) {
      setGamesState('NOT_STARTED');
      return;
    }

    const hasInProgressGames = todaysGames.some(
      (game) => game.gameStatus === 2
    );
    const hasFinishedGames = todaysGames.every((game) => game.gameStatus === 3);

    if (hasInProgressGames) {
      setGamesState('IN_PROGRESS');
    } else if (hasFinishedGames) {
      setGamesState('FINISHED');
    } else {
      setGamesState('NOT_STARTED');
    }
  }, [todaysGames]);

  if (!todaysGames) {
    return null;
  }

  return (
    <SkeletonTheme baseColor='#cccccc' highlightColor='#e6e6e6'>
      {isLoading ? (
        <div className='skeleton-message-container'>
          <Skeleton className='skeleton-message' />
        </div>
      ) : (
        <div className='list-message-container'>
          {gamesState === 'NOT_STARTED' && (
            <div className='list-message'>Games haven't started yet.</div>
          )}
          {gamesState === 'IN_PROGRESS' && (
            <div className='list-message'>Games are live!</div>
          )}
          {gamesState === 'FINISHED' && (
            <div className='list-message'>
              All games have finished.
              <br />
              New game information at 1:15PM EST.
            </div>
          )}
        </div>
      )}
      <div className='list-divider'>
        <div className='divider'></div>
      </div>
      <ul className='list-of-games-today'>
        {isLoading ? (
          <Skeleton className='skeleton-wrapper' count={numberOfGames} />
        ) : (
          todaysGames.map((game) => {
            const predictedGame = predictedGames.find(prediction => prediction.game_id === +game.gameId);
            const isPredicted = !!predictedGame;

            return (
              <GameCard
                game={game}
                key={game.gameId}
                isPredicted={isPredicted}
                predictedWinner={predictedGame?.predicted_winner}
              />
            );
          })
        )}
      </ul>
      <div className='list-divider'>
        <div className='divider'></div>
      </div>
    </SkeletonTheme>
  );
};
