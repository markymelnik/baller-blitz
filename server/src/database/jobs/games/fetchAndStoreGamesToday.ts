import { transformGamesTodayData } from "./transformGamesTodayData";
import { insertGamesTodayIntoDatabase } from "./insertGamesTodayIntoDatabase";
import { fetchGames } from "./fetchGames";

export async function fetchAndStoreGamesToday() {
	try {
		const games = await fetchGames();

		const transformedGames = transformGamesTodayData(games);

		await insertGamesTodayIntoDatabase(transformedGames);
		
		console.log('Running game retrieval, transformation, and storage.');
	} catch(error) {
		console.error(error);
	}
}