import pg from 'pg';
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from '../env';

const { Pool } = pg;

const pool = new Pool({
  user: `${DB_USER}`,
  host: `${DB_HOST}`,
  database: `${DB_NAME}`,
  password: `${DB_PASS}`,
  port: +`${DB_PORT}`,
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
