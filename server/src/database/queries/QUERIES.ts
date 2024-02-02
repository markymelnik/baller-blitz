type QueryTypes = {
  CREATE_USER: string;
  GET_USER_ROLE_BY_ID: string;
  FIND_USER_BY_ID: string;
  FIND_USER_BY_EMAIL: string;

  ASSIGN_DEFAULT_ROLE: string;
};

export const QUERIES: QueryTypes = {
  CREATE_USER: `INSERT INTO users (email, password) VALUES($1, $2) RETURNING *;`,
  GET_USER_ROLE_BY_ID: `SELECT roles.name FROM user_roles JOIN roles ON user_roles.role_id = roles.id WHERE user_roles.user_id = $1;`,
  FIND_USER_BY_ID: `SELECT * FROM users WHERE id = $1;`,
  FIND_USER_BY_EMAIL: `SELECT * FROM users WHERE email = $1;`,

  ASSIGN_DEFAULT_ROLE: `INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)`,
};
