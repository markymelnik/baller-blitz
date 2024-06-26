import { lazy, useState } from "react";

import { Icons } from "../../../../lib/Icons.ts";
import { Game } from "../../../../types/gameTypes.ts"
import { GameDataFormatter } from "../../../../utils/GameDataFormatter.ts";
import { GameState } from "../GameState.ts";
import './game-card.scss';

type GameCardProps = {
	game: Game;
  isPredicted: boolean;
  predictedWinner: string | undefined;
  onSuccessfulSubmission: () => void;
}

const SelectWinnerOverlay = lazy(() => import('../../../overlays/SelectWinnerOverlay/SelectWinnerOverlay.tsx'));
const StartedOverlay = lazy(() => import('../../../overlays/StartedOverlay/StartedOverlay.tsx'));
const AlreadyPredictedOverlay = lazy(() => import('../../../overlays/AlreadyPredictedOverlay/AlreadyPredictedOverlay.tsx'));

export const GameCard = ({ game, isPredicted, predictedWinner, onSuccessfulSubmission }: GameCardProps) => {

  const [isSelectionOverlayOpen, setIsSelectionOverlayOpen] = useState<boolean>(false);
  const [isStartedOverlayOpen, setIsStartedOverlayOpen] = useState<boolean>(false);
  const [isAlreadyPredictedOverlayOpen, setIsAlreadyPredictedOverlayOpen] = useState<boolean>(false);

  const gameStatus = GameDataFormatter.determineStatus(game.gameStatus);

  const handleGameCardClick = () => {
    if (gameStatus === GameState.NOT_STARTED) {
      if (isPredicted) {
        if (!isAlreadyPredictedOverlayOpen) {
          setIsAlreadyPredictedOverlayOpen(true);
        }
      } else if (!isSelectionOverlayOpen) {
        setIsSelectionOverlayOpen(true);
      }
    } else if (gameStatus === GameState.IN_PROGRESS) {
      if (!isStartedOverlayOpen) {
        setIsStartedOverlayOpen(true);
      }
    } else if (gameStatus === GameState.FINISHED) {
      /* console.log('click finished card') */
    }
  };

  const handleOverlayClose = () => {
    setIsSelectionOverlayOpen(false);
  };

  const handleStartedOverlayClose = () => {
    setIsStartedOverlayOpen(false);
  };

  const handleAlreadyPredictedOverlayClose = () => {
    setIsAlreadyPredictedOverlayOpen(false);
  };

  function predictionStatus(game: Game) {
		const finalWinner = GameDataFormatter.determineWinner(game);
		return finalWinner === predictedWinner;
	}

  return (
    <>
      <li
        className={`game-card ${
          gameStatus === GameState.NOT_STARTED && isPredicted ? `predicted` : ``
        }${gameStatus === GameState.IN_PROGRESS ? `started` : ``}${
          gameStatus === GameState.FINISHED ? `finished` : ``
        }`}
        onClick={handleGameCardClick}
      >
        {gameStatus === GameState.NOT_STARTED && (
          <div className='game-card-top'>
            <div className='game-date'>
              {GameDataFormatter.formatDate(game.gameEt)}
            </div>
            {isPredicted ? (
              <div className='game-card-predicted'>
                <Icons.Check size={20} />
                <div className='predicted-text'>
                  Predicted {predictedWinner}
                </div>
              </div>
            ) : (
              <div className='game-card-predicted'>
                <div className='predicted-text'>Not Predicted</div>
              </div>
            )}
          </div>
        )}

        {gameStatus === GameState.IN_PROGRESS && (
          <div className='game-card-top'>
            <div className='game-date'>
              {GameDataFormatter.formatDate(game.gameEt)}
            </div>
            {isPredicted ? (
              <div className='game-card-predicted'>
                <Icons.Check size={18} />
                <div className='predicted-text'>
                  Predicted {predictedWinner}
                </div>
              </div>
            ) : (
              <div className='game-card-predicted'>
                <div className='predicted-text'>Not Predicted</div>
              </div>
            )}
            <div className='game-card-live'>• Live</div>
          </div>
        )}
        {gameStatus === GameState.FINISHED && (
          <div className='game-card-top'>
            <div className='game-date'>
              {GameDataFormatter.formatDate(game.gameEt)}
            </div>
            <div className='game-card-predicted'>
              {isPredicted && (
                <>
                  <div className='predicted-text'>
                    Predicted {predictedWinner}
                  </div>
                  {predictionStatus(game) ? (
                    <Icons.Check size={18} />
                  ) : (
                    <Icons.Close size={18} />
                  )}
                </>
              )}

              <div className='predicted-outcome'>{`Winner: ${GameDataFormatter.determineWinner(
                game
              )}`}</div>
            </div>
          </div>
        )}

        <div className='game-card-bot'>
          <div className='game-card-left'>
            <div className='game-matchup'>
              <div className='game-teams'>
                <div className='away-team-name'>
                  {game.awayTeam.teamName || `TBD`}
                </div>
                <div className='home-team-name'>
                  {game.homeTeam.teamName || `TBD`}
                </div>
              </div>
              {gameStatus !== GameState.NOT_STARTED && (
                <div className='game-scores'>
                  <div className='team-score'>
                    {game.awayTeam.score || `TBD`}
                  </div>
                  <div className='team-score'>
                    {game.homeTeam.score || `TBD`}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='game-card-right'>
            {gameStatus === GameState.NOT_STARTED && (
              <div className='game-start'>
                {GameDataFormatter.formatTimeToEST(game.gameTimeUTC)}
              </div>
            )}
            {gameStatus === GameState.IN_PROGRESS && (
              <div className='game-period'>{game.gameStatusText}</div>
            )}
            {gameStatus === GameState.FINISHED && (
              <div className='game-winner'>Final</div>
            )}
            {gameStatus === GameState.IN_PROGRESS && (
              <div className='current-winner'>
                {GameDataFormatter.determineWinner(game)}
              </div>
            )}
          </div>
        </div>
      </li>
      <SelectWinnerOverlay
        isOpen={isSelectionOverlayOpen}
        onClose={handleOverlayClose}
        game={game}
        onSuccessfulSubmission={onSuccessfulSubmission}
      />
      <StartedOverlay
        isOpen={isStartedOverlayOpen}
        onClose={handleStartedOverlayClose}
      />
      <AlreadyPredictedOverlay
        isOpen={isAlreadyPredictedOverlayOpen}
        onClose={handleAlreadyPredictedOverlayClose}
        game={game}
        predictedWinner={predictedWinner}
        onSuccessfulSubmission={onSuccessfulSubmission}
      />
    </>
  );
};