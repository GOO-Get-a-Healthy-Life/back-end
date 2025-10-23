// src/config/db.js
require('dotenv').config();

const { Pool } = require('pg');

// Cria um "pool" de conexões com o banco.
// O Pool gerencia as conexões para você de forma eficiente.
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Exportamos um objeto com um método "query"
// Isso permite que nossos controllers façam "db.query(...)"
module.exports = pool;