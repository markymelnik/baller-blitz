import { useEffect, useRef, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { useFetchGamesToday } from '../../../../hooks/games/useFetchGamesToday';
import { useFetchCurrentPredictions } from '../../../../hooks/predictions/useFetchCurrentPredictions';
import { useIsMobile } from '../../../../hooks/page/useIsMobile';
import { useGamesToday } from '../../../../hooks/stateSelectors';
import { Icons } from '../../../../lib/Icons';

import { HomeGame } from './HomeGame/HomeGame';
import 'react-loading-skeleton/dist/skeleton.css';
import './home-games.scss';


export const HomeGames = ({ handleNavToGamesTab }: { handleNavToGamesTab?: () => void }) => {
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useFetchGamesToday(fetchTrigger);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isLeftDisabled, setIsLeftDisabled] = useState<boolean>(true);
  const [isRightDisabled, setIsRightDisabled] = useState<boolean>(false);

  const predictedGames = useFetchCurrentPredictions()!;
  const todaysGames = useGamesToday();

  const isMobile = useIsMobile();

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (predictedGames) {
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
    }
  }, [predictedGames]);

  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        setIsLeftDisabled(scrollLeft <= 0);
        setIsRightDisabled(scrollLeft + clientWidth >= scrollWidth - 1);
      }
    };

    const slider = sliderRef.current;
    slider?.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      slider?.removeEventListener('scroll', handleScroll);
    };
  });

  if (!predictedGames) {
    return <Skeleton className='hg-list-skeleton' />;
  }

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -325, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 325, behavior: 'smooth' });
    }
  };

  const handleGamesListUpdate = () => {
    setFetchTrigger((prev) => !prev);
  };

  const homeGames = todaysGames.filter((game) =>
    predictedGames.some(
      (predictedGame) => predictedGame.game_id === +game.gameId
    )
  );

  const numberOfGames = homeGames.length;

  return (
    <SkeletonTheme baseColor='#cccccc' highlightColor='#e6e6e6'>
      <div className='home-games'>
        <div className='home-games-top'>
          <h2 className='hg-header'>{`Your predictions`}</h2>
          {isMobile && numberOfGames > 1 && (
            <div className='hg-slider-btns'>
              <div
                className={`slider-btn-left ${
                  isLeftDisabled ? 'disabled' : ''
                }`}
                onClick={scrollLeft}
              >
                <Icons.ArrowLeft size={25} />
              </div>
              <div
                className={`slider-btn-right ${
                  isRightDisabled ? 'disabled' : ''
                }`}
                onClick={scrollRight}
              >
                <Icons.ArrowRight size={25} />
              </div>
            </div>
          )}
        </div>
        {isLoading ? (
          <div className={`hg-loading ${!isMobile ? `desktop` : ``}`}>
            {new Array(numberOfGames || 1).fill(0).map((_, index) => (
              <div key={index}>
                <Skeleton className='hg-list-skeleton' />
              </div>
            ))}
          </div>
        ) : isMobile ? (
          numberOfGames < 1 ? (
            <div className='hg-no-games'>
              <div className='no-games-card'>
              <div className='no-games-text'>
                <div className="no-pred-text">No predictions made!</div>
                <button className="nav-to-games-tab" onClick={handleNavToGamesTab}>GAMES <Icons.ArrowRight /></button>
              </div>
              </div>
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
          )
        ) : numberOfGames < 1 ? (
          <div className='hg-no-games'>
            <div className='no-games-card'>
              <div className='no-games-text'>
                <div className="no-pred-text">No predictions made!</div>
                <button className="nav-to-games-tab" onClick={handleNavToGamesTab}>GAMES <Icons.ArrowRight /></button>
  
              </div>
            </div>
          </div>
        ) : (
          <ul className='hg-list-desktop'>
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
        )}
      </div>
    </SkeletonTheme>
  );
}