import { useState } from "react";

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

  return (
    <>
      <li className={`game-card ${gameStatus === GameState.FINISHED ? `finished` : ``}`} onClick={handleGameCardClick}>
        <div className='game-date'>{GameDataFormatter.formatDate(game.gameEt)}</div>
        <div className='game-matchup'>
          {game.awayTeam.teamName} vs.{' '}
          {game.homeTeam.teamName}
        </div>
        <div className='game-start'>{GameDataFormatter.formatTimeToEST(game.gameTimeUTC)}</div>
        <div className="game-away team-score">
        {game.awayTeam.teamTricode} {game.awayTeam.score}
        </div>
        <div className="game-away team-score">
        {game.homeTeam.teamTricode} {game.homeTeam.score}
        </div>
        <div className="game-period">- {game.gameStatusText} -</div>
        <div className='game-status'>Status: {gameStatus}</div>
        {gameStatus === GameState.FINISHED && <div className='game-winner'>Winner: {GameDataFormatter.determineWinner(game)}</div> }
        {gameStatus === GameState.IN_PROGRESS && <div className="current-winner">Current Lead: {GameDataFormatter.determineWinner(game)}</div>}
      </li>
      <SelectWinnerOverlay isOpen={isOverlayOpen} onClose={handleOverlayClose} game={game} />
    </>
  );
};