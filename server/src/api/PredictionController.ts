import { NextFunction, Request, Response } from "express";
import { Prediction } from "../database/models/predictionModel";
import { DatabaseQuery } from "../database/queries/DatabaseQuery";

export const PredictionController = {
	async makePrediction(request: Request, response: Response, next: NextFunction) {
		try {
			const prediction: Prediction = request.body;
			const res = await DatabaseQuery.insertPredictionIntoDB(prediction);
	
			response.status(201).json(res);
		} catch (error) {
			next(error);
		}
	},

	async updatePrediction(request: Request, response: Response, next: NextFunction) {
		try {
			const prediction: Prediction = request.body;
			const res = await DatabaseQuery.updatePredictionInDB(prediction);
			response.status(201).json(res);
		} catch (error) {
			next(error);
		}
	},

	async getUserPredictionStats(request: Request, response: Response, next: NextFunction) {
		try {
			const userId = request.user.id;
			const predictions: Prediction[] = await DatabaseQuery.getUserPredictionStatsFromDB(+userId);
			response.status(200).json(predictions);
		} catch(error) {
			next(error);
		}
	},

	async updatePredictionsInDatabase() {
		try {
			await DatabaseQuery.updatePredictionOutcomeInDB();
			console.log(`Updated prediction in database.`)
		} catch (error) {
			console.error(error);
		}
	},

	async getCurrentUserPredictions(request: Request, response: Response) {
		try {
			const userId = request.user.id;
			const gameIdsQuery = request.query.gameIds as string;
			const gameIds = gameIdsQuery ? gameIdsQuery.split(',').map(id => parseInt(id, 10)).filter(id => !isNaN(id)) : [];

			if (!userId || gameIds.length === 0) {
				response.status(400).json({ error: "Missing userId or gameIds" });
				return;
		}

			const currentPredictions: Prediction[] = await DatabaseQuery.getCurrentPredictionsFromDB(+userId, gameIds);
			response.status(200).json(currentPredictions);
		} catch (error) {
			console.error(error);
		}
	},

	async getAllUserPredictionsByUserId(request: Request, response: Response, next: NextFunction) {
		try {
			const userId = request.user.id;
			const predictions: Prediction[] = await DatabaseQuery.getAllPredictionsByUserIdFromDB(+userId);
			response.status(200).json(predictions);
		}  catch (error) {
			next(error);
		}
	},

}