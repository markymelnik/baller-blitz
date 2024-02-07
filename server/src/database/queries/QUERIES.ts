type UserQueryTypes = {
  CREATE_USER: string;
  GET_USER_ROLE_BY_ID: string;
  FIND_USER_BY_ID: string;
  FIND_USER_BY_EMAIL: string;
  ASSIGN_DEFAULT_ROLE: string;
};

type GameQueryTypes = {
  GET_GAME_BY_ID: string;
  GET_GAMES: string;
  ADD_GAME: string;
}

export const USER_QUERY: UserQueryTypes = {
  CREATE_USER: `INSERT INTO users (email, password) VALUES($1, $2) RETURNING *;`,
  GET_USER_ROLE_BY_ID: `SELECT roles.name FROM user_roles JOIN roles ON user_roles.role_id = roles.id WHERE user_roles.user_id = $1;`,
  FIND_USER_BY_ID: `SELECT * FROM users WHERE id = $1;`,
  FIND_USER_BY_EMAIL: `SELECT * FROM users WHERE email = $1;`,
  ASSIGN_DEFAULT_ROLE: `INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)`,
}

export const GAME_QUERY: GameQueryTypes = {
  GET_GAME_BY_ID: `SELECT * FROM games WHERE game_id = $1;`,
  GET_GAMES: `SELECT * FROM games;`,
  ADD_GAME: `INSERT INTO games (game_id, game_date, away_tricode, home_tricode, away_score, home_score, winner, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING game_id;`,
}
