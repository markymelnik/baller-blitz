import { NextFunction, Request, Response } from "express";
import { DatabaseQuery } from "../../database/queries/DatabaseQuery";

export const UserController = {
	async updateUsername (request: Request, response: Response, next: NextFunction) {
		try {
			const userId = request.user.id;
			const { username: newUsername } = request.body;
			const res = await DatabaseQuery.updateUsernameInDB(userId, newUsername);
			response.status(200).json({ message: 'Username updated successfully', updatedUsername: newUsername });
		} catch (error) {
			next(error);
		}
	}
}