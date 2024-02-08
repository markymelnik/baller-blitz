export interface Game {
	game_id: number;
	game_date: string;
	away_tricode: string;
	home_tricode: string;
	away_score?: number;
	home_score?: number;
	winner?: string;
	status: string;
}