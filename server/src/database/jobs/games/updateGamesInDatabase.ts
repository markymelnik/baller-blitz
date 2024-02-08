import { DATA_SOURCE } from "../../../env";
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
					"home_score": game.awayTeam.score,
					"winner": determineWinner(game),
				}
				await DatabaseQuery.updateGame(game.gameId, updates);
				console.log(`Update finished game #${game.id} in the database.`)
			}
			console.log(`Did not actually updated but hit!`);
		}
	} catch (error) {
		console.error(error);
	}
}