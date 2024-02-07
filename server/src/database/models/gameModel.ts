export interface Game {
	game_id: string;
	game_date: string;
	away_tricode: string;
	home_tricode: string;
	away_score: number;
	home_score: number;
	winner: string;
	status: string;
}