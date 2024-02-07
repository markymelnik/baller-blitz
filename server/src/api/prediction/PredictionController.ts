import { NextFunction, Request, Response } from "express";
import { Prediction } from "../../database/models/predictionModel";
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
			const userId = parseInt(request.params.id);
			const predictions: Prediction[] = await DatabaseQuery.getUserPredictionsByUserId(userId);
			response.status(200).json(predictions);
		} catch(error) {
			next(error);
		}
	},
}