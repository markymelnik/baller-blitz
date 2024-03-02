import { useEffect, useRef, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { useFetchGamesToday } from '../../../../hooks/games/useFetchGamesToday';
import { useFetchCurrentPredictions } from '../../../../hooks/predictions/useFetchCurrentPredictions';
import { useGamesToday } from '../../../../hooks/stateSelectors';
import { Icons } from '../../../../lib/Icons';

import { HomeGame } from './HomeGame/HomeGame';
import 'react-loading-skeleton/dist/skeleton.css';
import './home-games.scss';

export const HomeGames = () => {
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useFetchGamesToday(fetchTrigger);

	const [isLoading, setIsLoading] = useState<boolean>(true);
  const predictedGames = useFetchCurrentPredictions()!;
  const todaysGames = useGamesToday();

  const sliderRef = useRef(null);



	useEffect(() => {
    if (predictedGames) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [predictedGames]);

  if (!predictedGames) {
    return <Skeleton className='hg-list-skeleton'/>;
  }

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -325, behavior: 'smooth' });
    }
  }

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 325, behavior: 'smooth' })
    }
  }

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
        <div className='home-games-top'>
          <h2 className='hg-header'>{`Your predictions`}</h2>
          <div className='hg-slider-btns'>
            <div className='slider-btn-left' onClick={scrollLeft}>
              <Icons.ArrowLeft size={25} />
            </div>
            <div className='slider-btn-right'>
              <Icons.ArrowRight size={25} onClick={scrollRight} />
            </div>
          </div>
        </div>

        {numberOfGames < 1 && !isLoading ? (
          <div className='hg-no-games'>
            <div className='no-games-msg'>
              No predictions
              <br />
              Place predictions in Games
            </div>
          </div>
        ) : isLoading ? (
          <div className='hg-loading'>
            {new Array(numberOfGames).fill(0).map((_, index) => (
              <div key={index} >
                <Skeleton className='hg-list-skeleton'/>
              </div>
            ))}
          </div>
        ) : (
          <div className='hg-slider' ref={sliderRef}>
            <ul className='hg-list'>
              {homeGames.map((game) => {
                const predictedGame = predictedGames.find(
                  (prediction) => prediction.game_id === +game.gameId
                );
                return (
                  <HomeGame
                    key={game.gameId}
                    game={game}
                    predictedWinner={predictedGame?.predicted_winner}
                    onSuccessfulSubmission={handleGamesListUpdate}
                  />
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </SkeletonTheme>
  );
}