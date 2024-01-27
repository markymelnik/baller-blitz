type QueryTypes = {
    CREATE_USER: string,
}

export const QUERIES: QueryTypes = {
    CREATE_USER: `INSERT INTO users (email, username, password) VALUES($1, $2, $3) RETURNING *;`
}