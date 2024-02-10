export interface Prediction {
	prediction_id: number;
	user_id: number;
	game_id: number;
	predicted_winner: string;
	is_correct: boolean;
}

export interface CurrentPredictionObject {
	game_id: number;
}