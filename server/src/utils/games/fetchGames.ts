import { DATA_SOURCE } from "../../env";

export async function fetchGames() {
	try {
		const response = await fetch(`${DATA_SOURCE}`);
		
		if (!response.ok) {
			console.error('error occurred when fetching data');
			return;
		}

		const data = await response.json();
		const games = data.scoreboard.games;
		return games;
	} catch (error) {
		console.error(error);
	}
}