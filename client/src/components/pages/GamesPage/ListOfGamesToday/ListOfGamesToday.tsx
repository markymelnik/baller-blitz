import { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { GameCard } from '../GameCard/GameCard';
import { useFetchGamesToday } from '../../../../hooks/games/useFetchGamesToday';
import { useFetchCurrentPredictions } from '../../../../hooks/predictions/useFetchCurrentPredictions';
import { useGamesToday } from '../../../../hooks/stateSelectors';
import 'react-loading-skeleton/dist/skeleton.css';
import './list-of-games-today.scss';
import { Content } from '../../../../lib/Content';

export const ListOfGamesToday = () => {
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useFetchGamesToday(fetchTrigger);

  const handleGamesListUpdate = () => {
    setFetchTrigger((prev) => !prev);
  };

  const predictedGames = useFetchCurrentPredictions()!;

  const todaysGames = useGamesToday();
  const numberOfGames = todaysGames.length;

  const [gamesState, setGamesState] = useState<string>('NOT_STARTED');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /* useEffect(() => {
    const interval = setInterval(() => {
      handleGamesListUpdate();
      console.log('hit data fetch');
    }, 30000);

    return () => clearInterval(interval);
  }, []) */

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
      {numberOfGames > 0 &&
        (isLoading ? (
          <div className='skeleton-message-container'>
            <Skeleton className='skeleton-message' />
          </div>
        ) : (
          <div className='list-message-container'>
            {gamesState === 'NOT_STARTED' && (
              <div className='list-message'>
                {Content.games.status[1]}
              </div>
            )}
            {gamesState === 'IN_PROGRESS' && (
              <div className='list-message'>
                {Content.games.status[2]}
              </div>
            )}
            {gamesState === 'FINISHED' && (
              <div className='list-message'>
                {Content.games.status[3]} <br />
                {Content.games.status[4]}
              </div>
            )}
          </div>
        ))}
      <div className='list-divider'>
        <div className='divider'></div>
      </div>
      {numberOfGames < 1 ? (
        <div className='no-games-today'>
          <div className='no-games-box'>
            <div className='no-games-text'>No games scheduled for today.</div>
            <div className='no-games-text'>Come back tomorrow!</div>
          </div>
        </div>
      ) : (
        <>
          <ul className='list-of-games-today'>
            {isLoading ? (
              <Skeleton className='skeleton-wrapper' count={numberOfGames} />
            ) : (
              todaysGames.map((game) => {
                const predictedGame = predictedGames.find(
                  (prediction) => prediction.game_id === +game.gameId
                );
                const isPredicted = !!predictedGame;

                return (
                  <GameCard
                    game={game}
                    key={game.gameId}
                    isPredicted={isPredicted}
                    predictedWinner={predictedGame?.predicted_winner}
                    onSuccessfulSubmission={handleGamesListUpdate}
                  />
                );
              })
            )}
          </ul>
          <div className='list-divider'>
            <div className='divider'></div>
          </div>
        </>
      )}
    </SkeletonTheme>
  );
};
