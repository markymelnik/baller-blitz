import { NextFunction, Request, Response } from 'express';
import { DatabaseQuery } from '../../database/queries/DatabaseQuery';
import { Game } from '../../database/models/gameModel';

export const GameController = {
  async getGameById(request: Request, response: Response, next: NextFunction) {
    try {
      const gameId = parseInt(request.params.id);

      const game = await DatabaseQuery.getGameById(gameId);

      response.status(200).json(game);
    } catch (error) {
      next(error);
    }
  },
	async getGames(request: Request, response: Response, next: NextFunction) {
		try {
			const games = await DatabaseQuery.getGames();
			response.status(200).json(games);
		} catch (error) {
			next(error);
		}
	},

  async addGame(request: Request, response: Response, next: NextFunction) {
    try {
      const game: Game = request.body;
      const res: number = await DatabaseQuery.addGame(game);
      response.status(201).json(res);
    } catch (error) {
      next(error);
    }
  },


};
