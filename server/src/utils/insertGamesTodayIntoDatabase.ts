import { Game } from "../database/models/gameModel";
import pool from "../database/pool";
import { GAME_QUERY } from "../database/queries/QUERIES";

export async function insertGamesTodayIntoDatabase(listOfGames: Game[]) {
	const client = await pool.connect();
	try {
		await client.query('BEGIN');
		for (const game of listOfGames) {
			const { game_id, game_date, away_tricode, home_tricode, away_score, home_score, winner, status } = game;
			await pool.query(GAME_QUERY.ADD_GAME, [ game_id, game_date, away_tricode, home_tricode, away_score, home_score, winner, status])
		}
		await client.query('COMMIT');
	} catch (error) {
		await client.query('ROLLBACK');
		throw error;
	} finally {
		client.release();
	}
}