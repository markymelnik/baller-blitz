import { NextFunction, Request, Response } from "express";
import { DatabaseQuery } from "../database/queries/DatabaseQuery";
import validator from "validator";

export const UserController = {
	async updateUsername (request: Request, response: Response, next: NextFunction) {
		try {
			const userId = request.user.id;
			const { username: newUsername } = request.body;

			const sanitizedUsername = validator.trim(newUsername);
			const escapedUsername = validator.escape(sanitizedUsername);

			if (!validator.isLength(escapedUsername, { min: 4, max: 16 })) {
				throw new Error('Username must be between 4 and 16 characters.');
			}

			if (!validator.matches(escapedUsername, /^[a-zA-Z0-9]+$/)) {
				throw new Error('Username can only contain numbs and letters.');
			}

			const res = await DatabaseQuery.updateUsernameInDB(+userId, newUsername);
			response.status(200).json({ message: 'Username updated successfully', updatedUsername: newUsername });
		} catch (error) {
			next(error);
		}
	},

	async searchAllUsers (request: Request, response: Response, next: NextFunction) {
		try {
			const { query, page = 1, pageSize = 10 } = request.query;
			const offset = (+page - 1) * +pageSize;
			const res = await DatabaseQuery.searchAllUsersFromDB(query, pageSize, offset);
			const total = res.length > 0 ? res[0].total_count : 0;
			response.status(200).json({ users: res, total });
		} catch (error) {
			next(error);
		}
	},
	
	async getUserPublicProfile (request: Request, response: Response, next: NextFunction) {
		try {
			const username = request.params.username;
			const userDetails = await DatabaseQuery.getUserDetailsByUsernameFromDB(username);
			const userStats = await DatabaseQuery.getUserPredictionStatsFromDB(userDetails.id);
			response.status(200).json({ userProfile: userDetails, userStats: userStats })
		} catch (error) {
			next(error);
		}
	}
}