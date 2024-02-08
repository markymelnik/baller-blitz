import { DatabaseQuery } from "../../queries/DatabaseQuery";
import { fetchGames } from "./fetchGames";

export async function updateGamesInDatabase() {
	try {
		const games = await fetchGames();

		for (const game of games) {
			if (game.gameStatus === 3) {
				const updates = {
					"away_score": game.awayTeam.score,
					"home_score": game.homeTeam.score,
					"winner": game.awayTeam.score > game.homeTeam.score ? game.awayTeam.teamTricode : game.homeTeam.teamTricode,
					"status": "finished",
				}
				await DatabaseQuery.updateGame(game.gameId, updates);
				console.log(`Updated game #${game.id} in the database!`)
			}
			console.log(`Successfully hit update game function.`);
		}
	} catch (error) {
		console.error(error);
	}
}