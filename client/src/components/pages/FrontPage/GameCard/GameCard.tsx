import { useState } from "react";
import { IconCheck, IconPointFilled } from "@tabler/icons-react";

import { Game } from "../../../../types/gameTypes.ts"
import { GameDataFormatter } from "../../../../utils/GameDataFormatter.ts";
import { SelectWinnerOverlay } from "../../../overlays/SelectWinnerOverlay/SelectWinnerOverlay.tsx";
import { GameState } from "../GameState.ts";
import { StartedOverlay } from "../../../overlays/StartedOverlay/StartedOverlay.tsx";
import { AlreadyPredictedOverlay } from "../../../overlays/AlreadyPredictedOverlay/AlreadyPredictedOverlay.tsx";
import './game-card.scss';

type GameCard = {
	game: Game;
  isPredicted: boolean;
  predictedWinner: string | undefined;
}

export const GameCard = ({ game, isPredicted, predictedWinner }: GameCard) => {

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
      console.log('click finished card')
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

  return (
    <>
      <li
        className={`game-card ${
          gameStatus === GameState.FINISHED ? `finished` : ``
        } ${
          gameStatus === GameState.NOT_STARTED && isPredicted ? `predicted` : ``
        }`}
        onClick={handleGameCardClick}
      >
        {gameStatus === GameState.IN_PROGRESS && (
          <>
            <div className='game-card-predicted-left'>
              <IconCheck size={16} />
              <div className='predicted-text'>Predicted {predictedWinner}</div>
            </div>
            <div className='game-card-live'>Live</div>
          </>
        )}
        {gameStatus === GameState.NOT_STARTED && isPredicted && (
          <div className='game-card-predicted'>
            <IconCheck size={16} />
            <div className='predicted-text'>Predicted {predictedWinner}</div>
          </div>
        )}
        {gameStatus === GameState.FINISHED && isPredicted && (
          <div className='game-card-predicted'>
            <div className='predicted-text'>Predicted {predictedWinner}</div>
              <IconPointFilled size={10} />
            <div className="predicted-outcome">{`Winner: ${GameDataFormatter.determineWinner(game)}`}</div>
          </div>
        )}
        <div className='game-card-left'>
          <div className='game-date'>
            {GameDataFormatter.formatDate(game.gameEt)}
          </div>
          <div className='game-matchup'>
            <div className='game-teams'>
              <div className='away-team-name'>{game.awayTeam.teamName}</div>
              <div className='home-team-name'>{game.homeTeam.teamName}</div>
            </div>
            {gameStatus !== GameState.NOT_STARTED && (
              <div className='game-scores'>
                <div className='team-score'>
                  {game.awayTeam.score}
                  
                </div>
                <div className='team-score'>
                  {game.homeTeam.score}
                
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
      </li>
      <SelectWinnerOverlay
        isOpen={isSelectionOverlayOpen}
        onClose={handleOverlayClose}
        game={game}
      />
      <StartedOverlay
        isOpen={isStartedOverlayOpen}
        onClose={handleStartedOverlayClose}
      />
      <AlreadyPredictedOverlay
        isOpen={isAlreadyPredictedOverlayOpen}
        onClose={handleAlreadyPredictedOverlayClose}
        predictedWinner={predictedWinner}
      />
    </>
  );
};