import { ApiClient } from "../api/ApiClient.ts";
import { TokenError } from "../errors/ErrorClasses.ts";
import { handleError } from "../errors/handleError.ts";
import { Prediction } from "../types/predictionTypes.ts";

export const PredictionManager = {
	async makePrediction(accessToken: string, prediction: Prediction) {
		try {
			const response = await ApiClient.storePredictionInApi(accessToken, prediction);
			return response;
		} catch (error) {
			const tokenError = new TokenError('Failed to make prediction');
			handleError(tokenError);
		}
	},

	async updatePrediction(accessToken: string, prediction: Prediction) {
		try {
			const response = await ApiClient.updatePredictionInApi(accessToken, prediction);
			return response;
		} catch (error) {
			const tokenError = new TokenError('Failed to make prediction');
			handleError(tokenError);
		}
	},

	async getCurrentPredictions(accessToken: string, gameIds: number[]) {
		try {
			const response = await ApiClient.fetchCurrentPredictionsFromApi(accessToken, gameIds);
			return response;
		} catch (error) {
			const tokenError = new TokenError('Failed to fetch current preductions');
			handleError(tokenError);
		}
	},

	async getUserStats(accessToken: string) {
		try {
			const response = await ApiClient.fetchUserStatsFromApi(accessToken);
			return response;
		} catch (error) {
			const tokenError = new TokenError('Failed to fetch user predictions.');
			handleError(tokenError);
		}
	},

	async getAllPredictions(accessToken: string) {
		try {
			const response = await ApiClient.fetchAllPredictionsFromApi(accessToken);
			return response;
		} catch (error) {
			const tokenError = new TokenError('Failed to fetch all predictions.');
			handleError(tokenError);
		}
	},
}