import { Game } from "../../types/gameTypes.ts"
import { GameDataFormatter } from "../GameDataFormatter.ts";
import './game-card.scss';

type GameCard = {
	game: Game;
}

export const GameCard = ({ game }: GameCard) => {
  return (
    <li className='game-card'>
      <div className='game-date'>{GameDataFormatter.formatDate(game.gameTimeUTC)}</div>
      <div className='game-matchup'>
        
        {game.awayTeam.teamName} vs.{' '}
        {game.homeTeam.teamName}
      </div>
      <div className='game-start'>Today {GameDataFormatter.formatTimeToEST(game.gameTimeUTC)}</div>
			<div className="game-tricode">
				{game.awayTeam.teamTricode} {game.homeTeam.teamTricode}
			</div>
			<div className='game-score'>
        {game.awayTeam.score} - {game.homeTeam.score}
      </div>
      <div className='game-status'>Status: {GameDataFormatter.determineStatus(game)}</div>
      <div className='game-winner'>Winner: {GameDataFormatter.determineWinner(game)}</div>
    </li>
  );
};