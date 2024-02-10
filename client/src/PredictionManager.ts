import { ApiClient } from "./api/ApiClient.ts";
import { TokenError } from "./errors/ErrorClasses.ts";
import { handleError } from "./errors/handleError.ts";
import { Prediction } from "./types/predictionTypes.ts";

export const PredictionManager = {
	async makePrediction(prediction: Prediction) {
		try {
			const response = await ApiClient.makePrediction('/predictions/new', prediction);
			return response;
		} catch (error) {
			const tokenError = new TokenError('Failed to make prediction');
			handleError(tokenError);
		}
	}, 

	async fetchCurrentPredictions(userId: number, gameIds: number[]) {
		try {
			const response = await ApiClient.fetchCurrentPredictions('/predictions/current', userId, gameIds);
			return response;
		} catch (error) {
			const tokenError = new TokenError('Failed to make prediction');
			handleError(tokenError);
		}
	}
}