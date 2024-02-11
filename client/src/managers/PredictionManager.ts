import { ApiClient } from "../api/ApiClient.ts";
import { TokenError } from "../errors/ErrorClasses.ts";
import { handleError } from "../errors/handleError.ts";
import { Prediction } from "../types/predictionTypes.ts";

export const PredictionManager = {
	async makePrediction(prediction: Prediction) {
		try {
			const response = await ApiClient.storePredictionInApi('/predictions', prediction);
			return response;
		} catch (error) {
			const tokenError = new TokenError('Failed to make prediction');
			handleError(tokenError);
		}
	}, 

	async getCurrentPredictions(accessToken: string, gameIds: number[]) {
		try {
			const response = await ApiClient.fetchCurrentPredictionsFromApi('/predictions/current', accessToken, gameIds);
			return response;
		} catch (error) {
			const tokenError = new TokenError('Failed to fetch current preductions');
			handleError(tokenError);
		}
	},

	async getUserStats(accessToken: string) {
		try {
			const response = await ApiClient.fetchUserStatsFromApi('/predictions/stats', accessToken);
			return response;
		} catch (error) {
			const tokenError = new TokenError('Failed to fetch user predictions.');
			handleError(tokenError);
		}
	},

	async getAllPredictions(accessToken: string) {
		try {
			const response = await ApiClient.fetchAllPredictionsFromApi('/predictions', accessToken);
			return response;
		} catch (error) {
			const tokenError = new TokenError('Failed to fetch all predictions.');
			handleError(tokenError);
		}
	},
}