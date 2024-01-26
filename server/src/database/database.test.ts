import { Pool } from "pg";

describe('Database Connection', () => {
  let pool: Pool;

  beforeAll(() => {
    const dbConfig = {
      user: 'postgres',
      host: 'localhost',
      database: '',
      password: '',
      port: 5532,
    };

    pool = new Pool(dbConfig);
  });

  afterAll(async () => {
    await pool.end();
  });

  it('should connect to the database', async () => {
    try {
      const res = await pool.query('SELECT NOW()');
      expect(res).toBeDefined();
      expect(res.rows).toBeDefined();
      expect(res.rows[0].now).toBeDefined();
    } catch (error: any) {
      fail(`Failed to connect to the database: ${error.message}`);
    }
  });
});

