const express = require('express');
const router = express.Router();
const goalsController = require('../../controllers/goals');
const { body } = require('express-validator');

// Получение всех целей
router.get('/', goalsController.getAllGoals);

// Страница создания новой цели
router.get('/new', goalsController.getNewGoalForm);

// Создание новой цели
router.post('/', 
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('targetDate').isISO8601().withMessage('Invalid date format'),
    body('type').isIn(['weight', 'running', 'strength', 'other']).withMessage('Invalid goal type')
  ],
  goalsController.createGoal
);

// Страница редактирования цели
router.get('/:id/edit', goalsController.getEditGoalForm);

// Получение одной цели
router.get('/:id', goalsController.getGoalById);

// Обновление цели
router.put('/:id', 
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().notEmpty().withMessage('Description cannot be empty'),
    body('targetDate').optional().isISO8601().withMessage('Invalid date format'),
    body('type').optional().isIn(['weight', 'running', 'strength', 'other']).withMessage('Invalid goal type')
  ],
  goalsController.updateGoal
);

// Удаление цели
router.delete('/:id', goalsController.deleteGoal);

module.exports = router; 