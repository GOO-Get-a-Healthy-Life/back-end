// src/routes/habits.js

const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const habitsController = require('../controllers/habitsController');

// --- ROTAS DE HÁBITOS ---

// (C)REATE - POST /api/habits

router.post('/', checkAuth, habitsController.createHabit);

// (R)EAD - GET /api/habits

router.get('/', checkAuth, habitsController.getAllHabits);

// (U)PDATE - PUT /api/habits/:id
router.put('/:id', checkAuth, habitsController.updateHabit);

// (D)ELETE - DELETE /api/habits/:id
router.delete('/:id', checkAuth, habitsController.deleteHabit);

// (Rota de teste)
router.get('/test', checkAuth, (req, res) => {
    res.status(200).json({ 
        message: "Rota de hábitos protegida funcionando!",
        user: req.userData
    });
});

module.exports = router;
