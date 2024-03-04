import { DatabaseError, DuplicateEmailError } from "../../errors/ErrorClasses";
import { Game } from "../models/gameModel";
import { Prediction } from "../models/predictionModel";
import { DatabaseUser, RequestingUser } from "../models/userModel";
import { FRIEND_QUERY, GAME_QUERY, PREDICTION_QUERY, USER_QUERY } from "./QUERIES";
import pool from "../pool";

export const DatabaseQuery = {
  async findUserByIdFromDB(userId: number): Promise<DatabaseUser> {
    try {
      const response = await pool.query(USER_QUERY.FIND_USER_BY_ID, [userId]);
      return response.rows[0] || null;
    } catch (error) {
      throw new DatabaseError('A database error occurred whildung user by id.');
    }
  },

  async findUserByEmailFromDB(email: string): Promise<DatabaseUser> {
    try {
      console.log(email);
      const response = await pool.query(USER_QUERY.FIND_USER_BY_EMAIL, [email]);
      console.log(response.rows);
      return response.rows[0] || null;
    } catch (error) {
      throw new DatabaseError('A database error occurred finding user by email.');
    }
  },

  async getUserRoleByIdFromDB(userId: number): Promise<string> {
    try {
      const result = await pool.query(USER_QUERY.GET_USER_ROLE_BY_ID, [userId]);
      return result.rows[0].name;
    } catch (error) {
      throw new DatabaseError('A database error occurred finding role by id.');
    }
  },

  async insertUserIntoDB(
    requestingUser: RequestingUser
  ): Promise<DatabaseUser> {
    try {
      const { email, password, username } = requestingUser;
      const result = await pool.query(USER_QUERY.CREATE_USER, [
        email,
        password,
        username,
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
        throw new DatabaseError('Database error inserting user into database');
      }
    }
  },

  async getGameByIdFromDB(userId: number): Promise<Game> {
    try {
      const response = await pool.query(GAME_QUERY.GET_GAME_BY_ID, [userId]);
      return response.rows[0] || null;
    } catch (error) {
      throw new DatabaseError('A database error occurred getting game by id.');
    }
  },

  async getAllGamesFromDB(): Promise<Game[]> {
    try {
      const response = await pool.query(GAME_QUERY.GET_ALL_GAMES);
      return response.rows || null;
    } catch (error) {
      throw new DatabaseError('A database error occurred getting all games');
    }
  },

  async addGameIntoDB(game: Game): Promise<number> {
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
      throw new DatabaseError('A database error occurred adding game');
    }
  },

  async updateGameInDB(
    gameId: number,
    updates: Record<string, any>
  ): Promise<any> {
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

  async insertPredictionIntoDB(prediction: Prediction): Promise<any> {
    const { user_id, game_id, predicted_winner } = prediction;
    try {
      const response = await pool.query(PREDICTION_QUERY.MAKE_PREDICTION, [
        user_id,
        game_id,
        predicted_winner,
      ]);
      return response.rows[0];
    } catch (error) {
      throw new DatabaseError('A database error occurred adding prediction');
    }
  },

  async updatePredictionInDB(prediction: Prediction): Promise<any> {
    const { user_id, game_id, predicted_winner } = prediction;
    try {
      const response = await pool.query(PREDICTION_QUERY.UPDATE_PREDICTION, [
        user_id,
        game_id,
        predicted_winner,
      ]);
      return response.rows[0];
    } catch (error) {
      throw new DatabaseError('A database error occurred updating predictions');
    }
  },

  async getUserPredictionStatsFromDB(user_id: number): Promise<any> {
    try {
      const response = await pool.query(PREDICTION_QUERY.GET_PREDICTION_STATS, [
        user_id,
      ]);
      return response.rows[0] || null;
    } catch (error) {
      console.error(error);
      throw new DatabaseError('A database error occurred getting stats');
    }
  },

  async updatePredictionOutcomeInDB(): Promise<any> {
    try {
      await pool.query(PREDICTION_QUERY.UPDATE_PREDICTION_OUTCOME);
    } catch (error) {
      throw new DatabaseError('A database error occurred updating prediction outcome');
    }
  },

  async getCurrentPredictionsFromDB(
    user_id: number,
    game_id: number[]
  ): Promise<any> {
    try {
      const response = await pool.query(
        PREDICTION_QUERY.GET_CURRENT_USER_PREDICTIONS,
        [user_id, game_id]
      );
      return response.rows || null;
    } catch (error) {
      throw new DatabaseError('A database error occurred getting current predictions');
    }
  },

  async getAllPredictionsByUserIdFromDB(user_id: number): Promise<any> {
    try {
      const response = await pool.query(PREDICTION_QUERY.GET_ALL_PREDICTIONS, [
        user_id,
      ]);
      return response.rows || null;
    } catch (error) {
      throw new DatabaseError('A database error occurred getting all predictions by user id');
    }
  },

  async markEmailVerifiedInDB(userId: number): Promise<any> {
    try {
      const response = await pool.query(USER_QUERY.UPDATE_EMAIL_VERIFY, [
        userId,
      ]);
      return response.rows || null;
    } catch (error) {
      throw new DatabaseError('A database error occurred getting email verified');
    }
  },

  async updateUsernameInDB(userId: number, newUsername: string): Promise<any> {
    try {
      const response = await pool.query(USER_QUERY.UPDATE_USERNAME_BY_ID, [
        userId,
        newUsername,
      ]);
      return response.rows[0];
    } catch (error) {
      throw new DatabaseError('A database error occurred while updating username');
    }
  },

  async searchAllUsersFromDB(
    query: string,
    pageSize: number,
    offset: number
  ): Promise<any> {
    try {
      const response = await pool.query(USER_QUERY.GET_ALL_USERS, [
        `%${query}%`,
        pageSize,
        offset,
      ]);
      return response.rows;
    } catch (error) {
      throw new DatabaseError('A database error occurred searching for users');
    }
  },

  async getUserDetailsByUsernameFromDB(username: string) {
    try {
      const response = await pool.query(USER_QUERY.FIND_USER_BY_USERNAME, [
        username,
      ]);
      return response.rows[0];
    } catch (error) {
      throw new DatabaseError('A database error occurred getting user details by username');
    }
  },

  async insertFriendRequestIntoDB(requesterId: number, addresseeId: number) {
    try {
      const response = await pool.query(FRIEND_QUERY.CREATE_FRIEND_REQUEST, [
        requesterId,
        addresseeId,
        'pending'
      ]);
      return response.rows;
    } catch (error) {
      throw new DatabaseError('A database error occurred while creating friend request');
    }
  },

  async acceptFriendRequestInDB(id: number) {
    try {
      const response = await pool.query(FRIEND_QUERY.UPDATE_FRIEND_REQUEST, ['accepted', id]);
      return response.rows;
    } catch (error) {
      throw new DatabaseError('A database error occurred while updating friend request');
    }
  },

  async rejectFriendRequestInDB(requestId: number) {
    try {
      const response = await pool.query(FRIEND_QUERY.UPDATE_FRIEND_REQUEST, ['rejected', requestId]);
      return response.rows;
    } catch (error) {
      throw new DatabaseError('A database error occurred while updating friend request');
    }
  },

  async getIncomingFriendRequestsFromDB(addressee_id: number) {
    try {
      const response = await pool.query(FRIEND_QUERY.READ_INCOMING_FRIEND_REQUESTS, ['pending', addressee_id]);
      return response.rows;
    } catch (error) {
      throw new DatabaseError('A database error occurred while gettiing incoming friend requests');
    }
  },

  async getOutgoingFriendRequestsFromDB(userId: number) {
    try {
      const response = await pool.query(FRIEND_QUERY.READ_OUTGOING_FRIEND_REQUESTS, ['pending', userId]);
    
      return response.rows;
    } catch (error) {
      throw new DatabaseError('A database error occurred while getting outgoing friend requests');
    }
  },

  async getAllFriendsByUserIdFromDB(id: number) {
    try {
      const response = await pool.query(FRIEND_QUERY.READ_ALL_FRIENDS, ['accepted', id]);
      return response.rows;
    } catch (error) {
      throw new DatabaseError('A database error occurred while updating friend request');
    }
  },

  async deleteFriendFromDB(userId: number, friendId: number) {
    try {
      const response = await pool.query(FRIEND_QUERY.DELETE_FRIEND, [userId, friendId, 'accepted']);
    
      return response.rows;
    } catch (error) {
      throw new DatabaseError('A database error occurred while deleting friend');
    }
  },

  async getFriendRequestStatus(requester_id: number, addressee_id: number) {
    try {
      const response = await pool.query(FRIEND_QUERY.READ_FRIEND_REQUEST_STATUS, [addressee_id, requester_id]);
      return response.rows[0];
    } catch (error) {
      throw new DatabaseError('A database error occurred while reading friend request status');
    }
  }
};