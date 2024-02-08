import { useState } from "react";
import { IconCaretLeftFilled } from "@tabler/icons-react";

import { Game } from "../../../types/gameTypes.ts"
import { GameDataFormatter } from "../GameDataFormatter.ts";
import { SelectWinnerOverlay } from "../SelectWinnerOverlay/SelectWinnerOverlay.tsx";
import { GameState } from "../GameState.ts";
import './game-card.scss';


type GameCard = {
	game: Game;
}

export const GameCard = ({ game }: GameCard) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);

  const gameStatus = GameDataFormatter.determineStatus(game.gameStatus);

  const handleGameCardClick = () => { 
    if (!isOverlayOpen) {
      setIsOverlayOpen(true);
    }
  }

  const handleOverlayClose = () => {
    setIsOverlayOpen(false);
  }

  const winner =
    game.awayTeam.score > game.homeTeam.score
      ? game.awayTeam.teamTricode
      : game.homeTeam.teamTricode;

  return (
    <>
      <li
        className={`game-card ${
          gameStatus === GameState.FINISHED ? `finished` : ``
        }`}
        onClick={handleGameCardClick}
      >
        {gameStatus === GameState.IN_PROGRESS && (
          <div className='game-card-live'>Live</div>
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
                  {gameStatus === GameState.FINISHED &&
                    winner === game.awayTeam.teamTricode && (
                      <IconCaretLeftFilled />
                    )}
                </div>
                <div className='team-score'>
                  {game.homeTeam.score}
                  {gameStatus === GameState.FINISHED &&
                    winner === game.homeTeam.teamTricode && (
                      <IconCaretLeftFilled />
                    )}
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
        isOpen={isOverlayOpen}
        onClose={handleOverlayClose}
        game={game}
      />
    </>
  );
};