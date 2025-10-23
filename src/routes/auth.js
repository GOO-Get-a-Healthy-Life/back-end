// src/routes/auth.js

const express = require('express');
const router = express.Router();

// Rota de teste
router.get('/test', (req, res) => {
  res.json({ 
    success: true,
    message: 'Rota de autenticação funcionando!' 
  });
});

// Rota de login (temporária)
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  res.json({ 
    success: true,
    message: 'Login recebido',
    data: { email }
  });
});

// Rota de registro (temporária)
router.post('/register', (req, res) => {
  const { nome, email, password } = req.body;
  
  res.json({ 
    success: true,
    message: 'Registro recebido',
    data: { nome, email }
  });
});

module.exports = router;