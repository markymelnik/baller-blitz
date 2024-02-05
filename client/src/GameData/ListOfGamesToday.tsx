import { useSelector } from "react-redux";

import { RootState } from "../redux/store.ts";
import { Game } from "../types/gameTypes.ts";
import './list-of-games-today.scss';

export const ListOfGamesToday = () => {
	const todaysGames = useSelector((state: RootState) => state.gamesToday.games);

	if (!todaysGames) {
		return null;
	}

	function isDone (text: string) {
		if (text.includes('Final')) return 'Final';
		return 'Ongoing';
	}

	function determineWinner(game: Game) {
		if (!game.gameStatusText.includes('Final')) return '';
    const { awayTeam, homeTeam } = game;

    if (awayTeam.score > homeTeam.score) {
      return awayTeam.teamName;
    } else return homeTeam.teamName;
  }

	return (
		<div className="list">
		{todaysGames.map((game: Game) => (
			<div className="game" key={game.gameId}>
				<div className="game-id">{game.gameId}</div>
				<div className="game-matchup">
				{game.awayTeam.teamCity} {game.awayTeam.teamName} vs. {game.homeTeam.teamCity} {game.homeTeam.teamName}
				</div>
				<div className="game-score">
					{game.awayTeam.score} - {game.homeTeam.score}
				</div>
				<div className="game-date">{game.gameEt.slice(0,10)}</div>
				<div className="game-start">Game Start: {game.gameTimeUTC}</div>
				<div className="game-end"></div>
				<div className="game-status">{isDone(game.gameStatusText)}</div>
				<div className="game-winner">Winner: {determineWinner(game)}</div>
			</div>
		))}
		</div>
	)
}