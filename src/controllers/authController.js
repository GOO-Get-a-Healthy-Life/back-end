// src/controllers/authController.js

const bcrypt = require('bcryptjs');
const pool = require('../config/db'); // Importa nosso pool de conexões

// Usamos 'exports.register' para exportar a função 'register'
exports.register = async (req, res) => {
  
  // 1. Pega os dados do corpo da requisição
  const { name, email, password } = req.body;

  // 2. Validação básica (não deixa campos em branco)
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Todos os campos (nome, email, senha) são obrigatórios.' });
  }

  try {
    // 3. Verifica se o e-mail já existe no banco
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Este e-mail já está cadastrado.' });
    }

    // 4. Criptografa (Hash) a senha
    // "genSalt(10)" é o "custo" da criptografia. 10 é um bom padrão.
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 5. Insere o novo usuário no banco de dados
    // 'RETURNING *' nos devolve os dados do usuário que acabamos de criar
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, created_at, xp, level',
      [name, email, passwordHash]
    );

    // 6. Responde com sucesso (Código 201 = Criado)
    res.status(201).json({
      message: 'Usuário registrado com sucesso!',
      user: newUser.rows[0] // Envia os dados do usuário criado (sem a senha!)
    });

  } catch (err) {
    console.error('Erro em authController.register:', err.message);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};