import { NextFunction, Request, Response } from 'express';
import { DatabaseQuery } from '../database/queries/DatabaseQuery';
import { Game } from '../database/models/gameModel';
import { fetchGames } from '../utils/games/fetchGames';
import { determineWinner } from '../utils/games/determineWinner';
import { transformGamesTodayData } from '../utils/games/transformGamesTodayData';
import { insertGamesTodayIntoDatabase } from '../utils/games/insertGamesTodayIntoDatabase';

export const GameController = {
  async getGameById(request: Request, response: Response, next: NextFunction) {
    try {
      const gameId = parseInt(request.params.id);

      const game = await DatabaseQuery.getGameByIdFromDB(gameId);

      response.status(200).json(game);
    } catch (error) {
      next(error);
    }
  },
	async getAllGames(request: Request, response: Response, next: NextFunction) {
		try {
			const games = await DatabaseQuery.getAllGamesFromDB();
			response.status(200).json(games);
		} catch (error) {
			next(error);
		}
	},

  async addGame(request: Request, response: Response, next: NextFunction) {
    try {
      const game: Game = request.body;
      const res: number = await DatabaseQuery.addGameIntoDB(game);
      response.status(201).json(res);
    } catch (error) {
      next(error);
    }
  },

  async updateGame(request: Request, response: Response, next: NextFunction) {
    try {
      const gameId = parseInt(request.params.id);
      const updates = request.body;

      const updatedGame = await DatabaseQuery.updateGameInDB(gameId, updates);
      
      response.status(200).json(updatedGame);
    } catch (error) {
      next(error);
    }
  },

  async updateGamesInDatabase() {
    try {
      const games = await fetchGames();
  
      for (const game of games) {
        if (game.gameStatus === 3) {
          const updates = {
            "away_score": game.awayTeam.score,
            "home_score": game.homeTeam.score,
            "winner": determineWinner(game),
            "status": "finished",
          }
          await DatabaseQuery.updateGameInDB(game.gameId, updates);
          console.log(`Updated status of game #${game.gameId}.`)
        }
      }
    } catch (error) {
      console.error(error);
    }
  },

  async fetchAndStoreGamesToday() {
    try {
      const games = await fetchGames();
  
      const transformedGames = transformGamesTodayData(games);
  
      await insertGamesTodayIntoDatabase(transformedGames);
      
      console.log('Running game retrieval, transformation, and storage.');
    } catch(error) {
      console.error(error);
    }
  }
};
