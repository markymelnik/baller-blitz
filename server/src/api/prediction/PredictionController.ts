import { NextFunction, Request, Response } from "express";
import { CurrentPredictionObject, Prediction } from "../../database/models/predictionModel";
import { DatabaseQuery } from "../../database/queries/DatabaseQuery";

export const PredictionController = {
	async makePrediction(request: Request, response: Response, next: NextFunction) {
		try {
			const prediction: Prediction = request.body;
			const res = await DatabaseQuery.makePrediction(prediction);
			response.status(201).json(res);
		} catch (error) {
			next(error);
		}
	},

	async getUserPredictionsByUserId(request: Request, response: Response, next: NextFunction) {
		try {
			const userId = request.user.id;
			const predictions: Prediction[] = await DatabaseQuery.getUserPredictionsByUserId(userId);
			response.status(200).json(predictions);
		} catch(error) {
			next(error);
		}
	},

	async updatePredictionsInDatabase() {
		try {
			await DatabaseQuery.updatePredictionOutcome();
			console.log(`Updated prediction in database.`)
		} catch (error) {
			console.error(error);
		}
	},

	async getCurrentUserPredictions(request: Request, response: Response) {
		try {
			const { userId, gameIds } = request.body;
			const currentPredictionsObject: CurrentPredictionObject[] = await DatabaseQuery.getCurrentPredictions(userId, gameIds);
			response.status(200).json(currentPredictionsObject);
		} catch (error) {
			console.error(error);
		}
	},

}