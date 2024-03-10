import { Pool } from 'pg';

const pool = new Pool({
    host: 'localhost',
  user: 'test',
  database: 'test',
  password: 'test',
  port: 5432,
});

export default pool;
