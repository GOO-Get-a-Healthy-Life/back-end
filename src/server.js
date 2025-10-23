// src/server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/db'); // Importa o pool de conexões
const authRoutes = require('./routes/auth'); 

const app = express();
const port = process.env.PORT || 3000;

async function startServer() {
  try {
    // 1. Tenta conectar ao banco de dados
    const client = await pool.connect();
    console.log('✅ Conectado ao banco de dados com sucesso.');
    client.release(); // Libera o cliente de volta para o pool
    
    // 2. Configura o Express (middlewares e rotas)
    app.use(cors());
    app.use(express.json());
    
    app.get('/', (req, res) => {
        res.send('API do Projeto Goo! Funcionando! 🚀');
    });
    
    app.use('/api/auth', authRoutes); 
    
    // 3. Inicia o servidor Express
    app.listen(port, () => {
        console.log(`🚀 Servidor rodando na porta ${port}`);
    });
  } catch (err) {
    console.error('❌ Falha ao conectar ao banco de dados. A aplicação não será iniciada.', err.stack);
    process.exit(1); // Encerra a aplicação com um código de erro
  }
}

startServer();