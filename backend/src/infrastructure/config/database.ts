import { Pool } from 'pg';

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
});

export default pool;
