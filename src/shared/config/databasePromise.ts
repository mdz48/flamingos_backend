import mysql, { Pool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool: Pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    namedPlaceholders: true,
    authPlugins: {
      mysql_clear_password: () => () => Buffer.from(process.env.DB_PASSWORD + '\0')
    },
    connectionLimit: 10
});

export default pool;
