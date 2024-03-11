import { useState } from 'react';

import { GameDataFormatter } from '../../../../../utils/GameDataFormatter';
import AlreadyPredictedOverlay from '../../../../overlays/AlreadyPredictedOverlay/AlreadyPredictedOverlay';
import { Game } from '../../../../../types/gameTypes';
import StartedOverlay from '../../../../overlays/StartedOverlay/StartedOverlay';
import { Icons } from '../../../../../lib/Icons';
import './home-game.scss';

type HomeGameProps = {
	game: Game;
  predictedWinner: string | undefined;
  onSuccessfulSubmission: () => void;
}

export const HomeGame = ({ game, predictedWinner, onSuccessfulSubmission }: HomeGameProps) => {

	const [isAlreadyPredictedOverlayOpen, setIsAlreadyPredictedOverlayOpen] = useState<boolean>(false);
	const [isStartedOverlayOpen, setIsStartedOverlayOpen] = useState<boolean>(false);

	const gameStatus: number = game.gameStatus;
  console.log(predictedWinner);

	const handleGameClick = () => {
		if (gameStatus === 1) {
			setIsAlreadyPredictedOverlayOpen(true);
		} else if (gameStatus === 2) {
			setIsStartedOverlayOpen(true);
		}
	};

	const handleStartedOverlayClose = () => {
    setIsStartedOverlayOpen(false);
  };

	function predictionStatus(game: Game) {
		const finalWinner = GameDataFormatter.determineWinner(game);
		return finalWinner === predictedWinner;
	}

	return (
    <>
      <li
        className={`home-game ${gameStatus === 2 && `live`} ${
          gameStatus === 3 && `finished`
        }`}
        onClick={handleGameClick}
      >
        <div className='hg-date'>
          {GameDataFormatter.formatDate(game.gameTimeUTC)}
        </div>
        <div className={`hg-top ${gameStatus === 2 && `live`}`}>
          <div className='hg-photo'></div>
        </div>

        <div className='hg-bot'>
          <div className='hg-data'>
            <div className='hg-matchup'>
              <div className='hg-team-away'>
                <div className={`team-pick`}>
                  {predictedWinner === game.awayTeam.teamTricode && (
                    <Icons.ArrowDown />
                  )}
                </div>
                <div className='team-tricode'>{game.awayTeam.teamTricode}</div>
                <div className='team-name'>
                  {game.awayTeam.teamCity} <br /> {game.awayTeam.teamName}
                </div>

                <div className='team-score'>{game.awayTeam.score}</div>
              </div>

              <div className='hg-team-home'>
                <div className={`team-pick`}>
                  {predictedWinner === game.homeTeam.teamTricode && (
                    <Icons.ArrowDown />
                  )}
                </div>
                <div className='team-tricode'>{game.homeTeam.teamTricode}</div>
                <div className='team-name'>
                  {game.homeTeam.teamCity} <br /> {game.homeTeam.teamName}
                </div>
                <div className='team-score'>{game.homeTeam.score}</div>
              </div>
            </div>

            {gameStatus === 1 && (
              <div className='hg-info'>{game.gameStatusText}</div>
            )}

            {gameStatus === 2 && (
              <div className='hg-info'>{game.gameStatusText}</div>
            )}
            {gameStatus === 3 && <div className='hg-info'>Final</div>}
          </div>
          <div className='hg-pred'>Prediction: {predictedWinner}</div>
        </div>

        {gameStatus === 3 && (
          <div className='hg-pred-outcome'>
            {predictionStatus(game) ? (
              <Icons.Check size={25} />
            ) : (
              <Icons.Close size={25} />
            )}
          </div>
        )}

        {gameStatus === 2 && <div className='hg-status live'>• LIVE</div>}
      </li>
      <StartedOverlay
        isOpen={isStartedOverlayOpen}
        onClose={handleStartedOverlayClose}
      />
      <AlreadyPredictedOverlay
        isOpen={isAlreadyPredictedOverlayOpen}
        onClose={() => setIsAlreadyPredictedOverlayOpen(false)}
        game={game}
        predictedWinner={predictedWinner}
        onSuccessfulSubmission={onSuccessfulSubmission}
      />
    </>
  );
}