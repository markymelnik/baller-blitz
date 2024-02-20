import { NextFunction, Request, Response } from "express";
import { DatabaseQuery } from "../database/queries/DatabaseQuery";

export const FriendController = {
	async createFriendRequest(request: Request, response: Response, next: NextFunction) {
		try {
			const requesterId = request.user.id;
			const { addresseeId } = request.body;
			const result = await DatabaseQuery.insertFriendRequestIntoDB(requesterId, addresseeId);
			response.status(200).json(result);
		} catch (error) {
			next(error);
		}
	},
	async acceptFriendRequest(request: Request, response: Response, next: NextFunction) {
		try {
			const requestId = parseInt(request.params.requestId);
			const result = await DatabaseQuery.acceptFriendRequestInDB(requestId);
			response.status(200).json(result);
		} catch (error) {
			next(error);
		}
	
	},
	async rejectFriendRequest(request: Request, response: Response, next: NextFunction) {
		try {
			const requestId = parseInt(request.params.requestId);
			const result = await DatabaseQuery.rejectFriendRequestInDB(requestId);
			response.status(200).json(result);
		} catch (error) {
			next(error);
		}
	
	},
	async getIncomingFriendRequestsByUserId(request: Request, response: Response, next: NextFunction) {
		try {
			const userId = request.user.id;
			const result = await DatabaseQuery.getIncomingFriendRequestsFromDB(userId);
			response.status(200).json(result);
		} catch (error) {
			next(error);
		}
	
	},
	async getOutgoingFriendRequestsByUserId(request: Request, response: Response, next: NextFunction) {
		try {
			const userId = request.user.id;
			const result = await DatabaseQuery.getOutgoingFriendRequestsFromDB(userId);
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
	},

	async getFriendRequestStatus(request: Request, response: Response, next: NextFunction) {
		try {
			const requesterId = request.user.id;
			const addresseeId = parseInt(request.query.addresseeId as string);
			const result = await DatabaseQuery.getFriendRequestStatus(requesterId, addresseeId);
			response.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}
}