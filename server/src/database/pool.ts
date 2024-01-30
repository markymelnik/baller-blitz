import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const DB_USER = process.env.DB_USER;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_PASS = process.env.DB_PASS;

const pool = new Pool({
  user: `${DB_USER}`,
  host: `${DB_HOST}`,
  database: `${DB_NAME}`,
  password: `${DB_PASS}`,
  port: 5532,
});

if (process.env.NODE_ENV !== 'test') {
  pool.query('SELECT NOW ()', (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Connection successful. Current time:', res.rows[0].now);
    /* pool.end(); */
  });
}

export default pool;
