import { useState } from 'react';

import { GameDataFormatter } from '../../../../../utils/GameDataFormatter';
import AlreadyPredictedOverlay from '../../../../overlays/AlreadyPredictedOverlay/AlreadyPredictedOverlay';
import './home-game.scss';
import { Game } from '../../../../../types/gameTypes';
import StartedOverlay from '../../../../overlays/StartedOverlay/StartedOverlay';
import { Icons } from '../../../../../lib/Icons';

type HomeGameProps = {
	game: Game;
  predictedWinner: string | undefined;
  onSuccessfulSubmission: () => void;
}

export const HomeGame = ({ game, predictedWinner, onSuccessfulSubmission }: HomeGameProps) => {

	const [isAlreadyPredictedOverlayOpen, setIsAlreadyPredictedOverlayOpen] = useState<boolean>(false);
	const [isStartedOverlayOpen, setIsStartedOverlayOpen] = useState<boolean>(false);

	const gameStatus: number = game.gameStatus;

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
        className={`home-game ${gameStatus === 2 && `live`} ${gameStatus === 3 && `finished`}`}
        onClick={handleGameClick}
      >
        <div className={`hg-top ${gameStatus === 2 && `live`}`}>
          <div className="hg-photo"></div>
        </div>

        <div className='hg-bot'>
          <div className='hg-date'>
            {GameDataFormatter.formatDate(game.gameTimeUTC)}
          </div>

          <div className='hg-matchup'>
            <div className='hg-teams'>
              <div className='team-tricode'>{game.awayTeam.teamTricode}</div>
              <div className='team-tricode'>{game.homeTeam.teamTricode}</div>
            </div>
            <div className='hg-scores'>
              {gameStatus !== 1 && (
                <>
                  <div className='team-score'>{game.awayTeam.score}</div>
                  <div className='team-score'>{game.homeTeam.score}</div>
                </>
              )}
            </div>
          </div>

          {gameStatus === 1 && (
            <div className='hg-status'>{game.gameStatusText}</div>
          )}
          {gameStatus === 2 && <div className='hg-status live'><span></span>LIVE</div>}
          {gameStatus === 3 && <div className='hg-status'>Finished</div>}

          <div className='hg-pred'>Prediction: {predictedWinner}</div>

          {gameStatus === 3 && (
            <div className='hg-pred-outcome'>
              {predictionStatus(game) ? (
                <Icons.Check size={30} />
              ) : (
                <Icons.Close size={30} />
              )}
            </div>
          )}
        </div>
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