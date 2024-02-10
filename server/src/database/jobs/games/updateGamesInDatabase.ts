import { DatabaseQuery } from "../../queries/DatabaseQuery";
import { determineWinner } from "./determineWinner";
import { fetchGames } from "./fetchGames";

export async function updateGamesInDatabase() {
	try {
		const games = await fetchGames();

		for (const game of games) {
			if (game.gameStatus === 3) {
				const updates = {
					"away_score": game.awayTeam.score,
					"home_score": game.homeTeam.score,
					"winner": determineWinner(game),
					"status": "finished",
				}
				await DatabaseQuery.updateGame(game.gameId, updates);
				console.log(`Updated game #${game.gameId} in the database.`)
			}
		}
	} catch (error) {
		console.error(error);
	}
}