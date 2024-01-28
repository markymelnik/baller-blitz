type QueryTypes = {
  CREATE_USER: string;
  FIND_USER_BY_EMAIL: string;
};

export const QUERIES: QueryTypes = {
  CREATE_USER: `INSERT INTO users (email, username, password) VALUES($1, $2, $3) RETURNING *;`,
  FIND_USER_BY_EMAIL: `SELECT * FROM users WHERE email = $1;`,
};
