import { useEffect, useState } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';

import { useFetchGamesToday } from '../../../../hooks/games/useFetchGamesToday';
import { useFetchCurrentPredictions } from '../../../../hooks/predictions/useFetchCurrentPredictions';
import { useGamesToday } from '../../../../hooks/stateSelectors';

import { HomeGame } from './HomeGame/HomeGame';
import './home-games.scss';

export const HomeGames = () => {
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useFetchGamesToday(fetchTrigger);

	const [isLoading, setIsLoading] = useState<boolean>(true);
  const predictedGames = useFetchCurrentPredictions()!;
  const todaysGames = useGamesToday();

	useEffect(() => {
    if (predictedGames) {
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
    }
  }, [predictedGames]);

  
  const handleGamesListUpdate = () => {
    setFetchTrigger((prev) => !prev);
  };

  const homeGames = todaysGames.filter((game) =>
    predictedGames.some((predictedGame) => predictedGame.game_id === +game.gameId)
  );

  const numberOfGames = homeGames.length;

	return (
    <SkeletonTheme baseColor='#cccccc' highlightColor='#e6e6e6'>
      <div className='home-games'>
        <h2 className='hg-header'>Your predictions</h2>
        {numberOfGames < 1 ? (
          <div className='hg-no-games'>No predictions made!</div>
        ) : (
          <div className='hg-slider'>
            <ul className='hg-list'>
              {isLoading ? (
                <div className='hg-loading'>Loading...</div>
              ) : (
                homeGames.map((game) => {
                  const predictedGame = predictedGames.find(
                    (prediction) => prediction.game_id === +game.gameId
                  );
                  return <HomeGame key={game.gameId} game={game} predictedWinner={predictedGame?.predicted_winner} onSuccessfulSubmission={handleGamesListUpdate}/>;
                })
              )}
            </ul>
          </div>
        )}
      </div>
    </SkeletonTheme>
  );
}