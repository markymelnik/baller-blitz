import { NextFunction, Request, Response } from "express";
import { DatabaseQuery } from "../database/queries/DatabaseQuery";

export const FriendController = {
	async createFriendRequest(request: Request, response: Response, next: NextFunction) {
		try {
			const { requesterId, addresseeId } = request.body;
			const result = await DatabaseQuery.insertFriendRequestIntoDB(requesterId, addresseeId);
			console.log(result);
			response.status(200).json(result);
		} catch (error) {
			next(error);
		}
	},
	async acceptFriendRequest(request: Request, response: Response, next: NextFunction) {
		try {
			const { requestId } = request.body;
			const result = await DatabaseQuery.acceptFriendRequestInDB(requestId);
			console.log(result);
			response.status(200).json(result);
		} catch (error) {
			next(error);
		}
	
	},
	async rejectFriendRequest(request: Request, response: Response, next: NextFunction) {
		try {
			const { requestId } = request.body;
			const result = await DatabaseQuery.rejectFriendRequestInDB(requestId);
			console.log(result);
			response.status(200).json(result);
		} catch (error) {
			next(error);
		}
	
	},
	async getIncomingFriendRequestsByUserId(request: Request, response: Response, next: NextFunction) {
		try {
			const userId = request.user.id;
			const result = await DatabaseQuery.getIncomingFriendRequestsFromDB(userId);
			console.log(result);
			response.status(200).json(result);
		} catch (error) {
			next(error);
		}
	
	},
	async getOutgoingFriendRequestsByUserId(request: Request, response: Response, next: NextFunction) {
		try {
			const userId = request.user.id;
			const result = await DatabaseQuery.getOutgoingFriendRequestsFromDB(userId);
			console.log(result);
			response.status(200).json(result);
		} catch (error) {
			next(error);
		}
	},

	async getAllFriendsByUserId(request: Request, response: Response, next: NextFunction) {
		try {
			const userId = request.user.id;
			const result = await DatabaseQuery.getAllFriendsByUserIdFromDB(userId);
			response.status(200).json(result);
		} catch (error) {
			next(error);
		}
	},

	async deleteFriend(request: Request, response: Response, next: NextFunction) {
		try {
			const userId = request.user.id;
			const friendId = request.body;
			const result = await DatabaseQuery.deleteFriendFromDB(userId, friendId);
			response.status(200).json(result);
		} catch (error) {
			next(error)
		}
	}
}