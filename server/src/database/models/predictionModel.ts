export interface Prediction {
	prediction_id: number;
	user_id: number;
	game_id: number;
	predicted_winner: string;
	is_correct: boolean;
	game_date: string;
	away_team: string;
	home_team: string;
}