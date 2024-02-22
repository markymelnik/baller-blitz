type UserQueryTypes = {
  CREATE_USER: string;
  GET_USER_ROLE_BY_ID: string;
  FIND_USER_BY_ID: string;
  FIND_USER_BY_EMAIL: string;
  FIND_USER_BY_USERNAME: string;
  ASSIGN_DEFAULT_ROLE: string;
  UPDATE_EMAIL_VERIFY: string;
  UPDATE_USERNAME_BY_ID: string;
  GET_ALL_USERS: string;
};

type GameQueryTypes = {
  GET_GAME_BY_ID: string;
  GET_ALL_GAMES: string;
  ADD_GAME: string;
};

type PredictionQueryTypes = {
  MAKE_PREDICTION: string;
  UPDATE_PREDICTION: string;
  GET_PREDICTION_STATS: string;
  UPDATE_PREDICTION_OUTCOME: string;
  GET_CURRENT_USER_PREDICTIONS: string;
  GET_ALL_PREDICTIONS: string,
};

type FriendQueryTypes = {
  CREATE_FRIEND_REQUEST: string;
  UPDATE_FRIEND_REQUEST: string;
  READ_INCOMING_FRIEND_REQUESTS: string;
  READ_OUTGOING_FRIEND_REQUESTS: string;
  READ_ALL_FRIENDS: string;
  DELETE_FRIEND: string;
  READ_FRIEND_REQUEST_STATUS: string;
}

export const USER_QUERY: UserQueryTypes = {
  CREATE_USER: `INSERT INTO users (email, password, username) VALUES($1, $2, $3) RETURNING *;`,
  GET_USER_ROLE_BY_ID: `SELECT roles.name FROM user_roles JOIN roles ON user_roles.role_id = roles.id WHERE user_roles.user_id = $1;`,
  FIND_USER_BY_ID: `SELECT * FROM users WHERE id = $1;`,
  FIND_USER_BY_EMAIL: `SELECT * FROM users WHERE email = $1;`,
  FIND_USER_BY_USERNAME: `SELECT id, email, username FROM users WHERE username = $1;`,
  ASSIGN_DEFAULT_ROLE: `INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)`,
  UPDATE_EMAIL_VERIFY: `UPDATE users SET is_verified = true WHERE id = $1;`,
  UPDATE_USERNAME_BY_ID: `UPDATE users SET username = $2 WHERE id = $1;`,
  GET_ALL_USERS: `SELECT id, email, username, 
  (SELECT COUNT(*) FROM users WHERE username ILIKE $1 OR email ILIKE $1) AS total_count
FROM users 
WHERE username ILIKE $1 OR email ILIKE $1
ORDER BY username 
LIMIT $2 OFFSET $3;`,
};

export const GAME_QUERY: GameQueryTypes = {
  GET_GAME_BY_ID: `SELECT * FROM games WHERE game_id = $1;`,
  GET_ALL_GAMES: `SELECT * FROM games;`,
  ADD_GAME: `INSERT INTO games (game_id, game_date, away_tricode, home_tricode, away_score, home_score, winner, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING game_id;`,
};

export const PREDICTION_QUERY: PredictionQueryTypes = {
  MAKE_PREDICTION: `INSERT INTO predictions (user_id, game_id, predicted_winner) VALUES ($1, $2, $3) RETURNING $2;`,
  UPDATE_PREDICTION: `UPDATE predictions SET predicted_winner = $3 WHERE user_id = $1 AND game_id = $2 RETURNING $3;`,
  GET_PREDICTION_STATS: `SELECT COUNT(*) AS total_predictions, SUM(CASE WHEN is_correct = true THEN 1 ELSE 0 END) AS correct_predictions, (SUM(CASE WHEN is_correct = true THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS accuracy_percentage FROM predictions WHERE user_id = $1 AND is_correct IS NOT NULL;`,
  UPDATE_PREDICTION_OUTCOME: `UPDATE predictions SET is_correct = CASE WHEN predictions.predicted_winner = games.winner THEN true ELSE false END FROM games WHERE predictions.game_id = games.game_id;`,
  GET_CURRENT_USER_PREDICTIONS: `
  SELECT 
    p.prediction_id, 
    p.user_id, 
    p.game_id, 
    p.predicted_winner, 
    p.is_correct,
    g.game_date,
    g.away_tricode AS away_team, 
    g.home_tricode AS home_team
  FROM predictions p
  JOIN games g ON p.game_id = g.game_id
  WHERE p.user_id = $1 AND p.game_id = ANY($2) AND g.status <> 'finished';`,
  
  GET_ALL_PREDICTIONS: `SELECT p.prediction_id, p.user_id, 
  p.game_id, 
  p.predicted_winner, 
  p.is_correct,
  g.game_date,
  g.away_tricode AS away_team, 
  g.home_tricode AS home_team
FROM predictions p
JOIN games g ON p.game_id = g.game_id
WHERE p.user_id = $1 AND g.status = 'finished' AND p.is_correct IS NOT NULL;`,
};

 /* `SELECT * FROM predictions WHERE user_id = $1;`,  */

 export const FRIEND_QUERY: FriendQueryTypes = {
   CREATE_FRIEND_REQUEST: `
   INSERT INTO friends (requester_id, addressee_id, status)
   VALUES ($1, $2, $3)
   ON CONFLICT (requester_id, addressee_id)
   DO UPDATE SET status = CASE
                              WHEN friends.status = 'rejected' THEN 'pending'
                              ELSE friends.status
                          END
   WHERE friends.status = 'rejected'
   RETURNING *;
 `,
   UPDATE_FRIEND_REQUEST: `UPDATE friends SET status = $1 WHERE id = $2 RETURNING *;`,
   READ_INCOMING_FRIEND_REQUESTS: `SELECT f.id AS request_id, u.id AS user_id, u.username
  FROM friends f
  JOIN users u
  ON f.requester_id = u.id
  WHERE f.addressee_id = $2
  AND f.status = $1;`,
   READ_OUTGOING_FRIEND_REQUESTS: `SELECT * FROM friends where requester_id = $1 AND status = $2;`,
   READ_ALL_FRIENDS: `
  SELECT u.id, u.username
  FROM friends f
  JOIN users u
  ON (f.requester_id = u.id OR f.addressee_id = u.id)
  WHERE (f.requester_id = $2 OR f.addressee_id = $2)
  AND f.status = $1
  AND u.id <> $2;
`,
   DELETE_FRIEND: `DELETE FROM friends WHERE (requester_id = $1 AND addressee_id = $2) OR (requester_id = $2 AND addressee_id = $1) AND status = $3 RETURNING *;`,
   READ_FRIEND_REQUEST_STATUS: `SELECT status FROM friends WHERE (requester_id = $2 AND addressee_id = $1) OR (requester_id = $1 AND addressee_id = $2);`,
 };