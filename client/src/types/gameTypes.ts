export interface AwayTeam {
	score: number;
	teamCity: string;
	teamName: string;
	teamTricode: string;
}

export interface HomeTeam {
	score: number;
	teamCity: string;
	teamName: string;
	teamTricode: string;
}

export interface Game {
	gameId: string;
	gameCode: string;
	gameEt: string;
	gameTimeUTC: string;
	gameStatus: number;
	awayTeam: AwayTeam;
	homeTeam: HomeTeam;
	gameStatusText: string;
	period: string;
}

export interface PredictedGame {
	prediction_id: number;
	user_id: number;
	game_id: number;
	predicted_winner: string;
	is_correct: boolean;
	game_date: string;
	away_team: string;
	home_team: string;
}
