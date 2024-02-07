import { NextFunction, Request, Response } from 'express';
import { DatabaseQuery } from '../../database/queries/DatabaseQuery';

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
};
