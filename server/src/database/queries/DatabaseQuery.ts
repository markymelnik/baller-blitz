import { DatabaseError, DuplicateEmailError } from "../../errors/ErrorClasses";
import { Game } from "../models/gameModel";
import { Prediction } from "../models/predictionModel";
import { DatabaseUser, RequestingUser } from "../models/userModel";
import pool from "../pool";
import { GAME_QUERY, PREDICTION_QUERY, USER_QUERY } from "./QUERIES";

export const DatabaseQuery = {
  async findUserById(userId: number): Promise<DatabaseUser> {
    try {
      const response = await pool.query(USER_QUERY.FIND_USER_BY_ID, [userId]);
      return response.rows[0] || null;
    } catch (error) {
      throw new DatabaseError('A database error occurred.');
    }
  },

  async findUserByEmail(email: string): Promise<DatabaseUser> {
    try {
      const response = await pool.query(USER_QUERY.FIND_USER_BY_EMAIL, [email]);
      return response.rows[0] || null;
    } catch (error) {
      throw new DatabaseError('A database error occurred.');
    }
  },

  async getUserRoleById(userId: number): Promise<string> {
    try {
      const result = await pool.query(USER_QUERY.GET_USER_ROLE_BY_ID, [userId]);
      return result.rows[0].name;
    } catch (error) {
      throw new DatabaseError('A database error occurred.');
    }
  },

  async insertUserIntoDatabase(
    requestingUser: RequestingUser
  ): Promise<DatabaseUser> {
    try {
      const { email, password } = requestingUser;
      const result = await pool.query(USER_QUERY.CREATE_USER, [
        email,
        password,
      ]);

      const userId = result.rows[0].id;
      const defaultUserRoleId = 2;

      await pool.query(USER_QUERY.ASSIGN_DEFAULT_ROLE, [
        userId,
        defaultUserRoleId,
      ]);
      return result.rows[0];
    } catch (error) {
      console.error(error);

      const err = error as { code?: string };

      if (err.code === '23505') {
        throw new DuplicateEmailError(
          'This email is already in use. Try a different one.'
        );
      } else {
        throw new DatabaseError('Unknown issue inserting user into database');
      }
    }
  },

  async getGameById(userId: number): Promise<Game> {
    try {
      const response = await pool.query(GAME_QUERY.GET_GAME_BY_ID, [userId]);
      return response.rows[0] || null;
    } catch (error) {
      throw new DatabaseError('A database error occurred.');
    }
  },

  async getGames(): Promise<Game[]> {
    try {
      const response = await pool.query(GAME_QUERY.GET_GAMES);
      return response.rows || null;
    } catch (error) {
      throw new DatabaseError('A database error occurred');
    }
  },

  async addGame(game: Game): Promise<number> {
    const {
			game_id,
      game_date,
      away_tricode,
      home_tricode,
      away_score,
      home_score,
      winner,
      status,
    } = game;
    try {
      const response = await pool.query(GAME_QUERY.ADD_GAME, [
				game_id,
        game_date,
        away_tricode,
        home_tricode,
        away_score,
        home_score,
        winner,
        status,
      ]);
      return response.rows[0].game_id || null;
    } catch (error) {
      throw new DatabaseError('A database error occurred');
    }
  },

  async updateGame(gameId: number, updates: Record<string, any>): Promise<any> {
    let QUERY: string = `UPDATE games SET `;
    const QUERY_PARAMS = [];
    let querySetParts = [];
    let paramIndex = 1;

    for (const [key, value] of Object.entries(updates)) {
      querySetParts.push(`${key} = $${paramIndex}`);
      QUERY_PARAMS.push(value);
      paramIndex++;
    }

    if (querySetParts.length === 0) {
      throw new Error('No update fields provided');
    }

    QUERY += querySetParts.join(', ');
    QUERY += ` WHERE game_id = $${paramIndex};`;
    QUERY_PARAMS.push(gameId);

    try {
      const response = await pool.query(QUERY, QUERY_PARAMS);
      return response.rows[0] || null;
    } catch (error) {
      throw new Error('Failed to update game');
    }

  },

  async makePrediction(prediction: Prediction): Promise<any> {
    const { user_id, game_id, predicted_winner } = prediction;
    try {
      const response = await pool.query(PREDICTION_QUERY.MAKE_PREDICTION, [user_id, game_id, predicted_winner]);
      console.log(response);
      return response.rows[0] || null;
    } catch (error) {
        throw new DatabaseError('A database error occurred');
    }
  },

  async getUserPredictionsByUserId(userId: number): Promise<any> {
    try {
      const response = await pool.query(PREDICTION_QUERY.GET_PREDICTIONS_BY_USER_ID, [userId]);
      console.log(response);
      return response.rows || null;
    } catch (error) {
      console.error(error);
      throw new DatabaseError('A database error occurred');
    }
  }
};