import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'rpg_database',
});

pool.on('connect', () => {
  console.log('Conectado ao PostgreSQL!');
});

pool.on('error', (err) => {
  console.error('Erro inesperado no pool de conexão do PostgreSQL', err);
  process.exit(-1); 
});

export default pool;