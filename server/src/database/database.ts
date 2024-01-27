import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: '',
  password: '',
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
