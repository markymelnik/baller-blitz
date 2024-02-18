import { Game } from "../../database/models/gameModel";

// This function filters the data into a useable form for the application
// gameData can be of any type

export function transformGamesTodayData(gameData: any): Game[] {
	return gameData.map((game: any) => {

		const [datePart, timePart] = game.gameEt.split('T');
		const time = timePart.slice(0,8);
		const game_date = `${datePart} ${time}`;
		const away_score = 0;
    const home_score = 0;
		const winner = 'TBD';
		const status = 'not_started';

		return {
      game_id: parseInt(game.gameId, 10),
      game_date,
      away_tricode: game.awayTeam.teamTricode || 'TBD',
      home_tricode: game.homeTeam.teamTricode || 'TBD',
      away_score,
      home_score,
      winner,
      status,
    };
	})
}