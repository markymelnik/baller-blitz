import { useState } from "react";

import { Game } from "../../../types/gameTypes.ts"
import { GameDataFormatter } from "../GameDataFormatter.ts";
import { GamePickOverlay } from "../GamePickOverlay/GamePickOverlay.tsx";
import './game-card.scss';

type GameCard = {
	game: Game;
}

export const GameCard = ({ game }: GameCard) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);
  const isGameFinished: boolean = game.gameStatusText.includes('Final');

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
      <li className={`game-card ${isGameFinished ? `finished` : ``}`} onClick={handleGameCardClick}>
        <div className='game-date'>{GameDataFormatter.formatDate(game.gameTimeUTC)}</div>
        <div className='game-matchup'>
          {game.awayTeam.teamName} vs.{' '}
          {game.homeTeam.teamName}
        </div>
        <div className='game-start'>Today {GameDataFormatter.formatTimeToEST(game.gameTimeUTC)}</div>
        <div className="game-tricode">
          {game.awayTeam.teamTricode} / {game.homeTeam.teamTricode}
        </div>
        <div className='game-score'>
          {game.awayTeam.score} - {game.homeTeam.score}
        </div>
        <div className="game-period">- {game.gameStatusText} -</div>
        <div className='game-status'>Status: {GameDataFormatter.determineStatus(game.gameStatus)}</div>
        {isGameFinished && <div className='game-winner'>Winner: {GameDataFormatter.determineWinner(game)}</div> }
        {!isGameFinished && <div className="current-winner">Current Lead: {GameDataFormatter.determineWinner(game)}</div>}
      </li>
      <GamePickOverlay isOpen={isOverlayOpen} onClose={handleOverlayClose} game={game} />
    </>
  );
};