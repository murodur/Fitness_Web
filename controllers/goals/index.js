const goalsService = require('../../services/goals');
const { validationResult } = require('express-validator');

exports.getAllGoals = async (req, res) => {
  try {
    const goals = await goalsService.getAllGoals();
    res.render('goals/index', { goals });
  } catch (error) {
    res.status(500).render('error', { error });
  }
};

exports.getNewGoalForm = (req, res) => {
  res.render('goals/new', { goal: null });
};

exports.getEditGoalForm = async (req, res) => {
  try {
    const goal = await goalsService.getGoalById(req.params.id);
    if (!goal) {
      return res.status(404).render('error', { error: 'Goal not found' });
    }
    res.render('goals/edit', { goal });
  } catch (error) {
    res.status(500).render('error', { error });
  }
};

exports.getGoalById = async (req, res) => {
  try {
    const goal = await goalsService.getGoalById(req.params.id);
    if (!goal) {
      return res.status(404).render('error', { error: 'Goal not found' });
    }
    res.render('goals/show', { goal });
  } catch (error) {
    res.status(500).render('error', { error });
  }
};

exports.createGoal = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('goals/new', { 
      errors: errors.array(),
      goal: req.body
    });
  }

  try {
    const goal = await goalsService.createGoal(req.body);
    res.redirect(`/goals/${goal._id}`);
  } catch (error) {
    res.status(500).render('error', { error });
  }
};

exports.updateGoal = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('goals/edit', { 
      errors: errors.array(),
      goal: { ...req.body, _id: req.params.id }
    });
  }

  try {
    const goal = await goalsService.updateGoal(req.params.id, req.body);
    if (!goal) {
      return res.status(404).render('error', { error: 'Goal not found' });
    }
    res.redirect(`/goals/${goal._id}`);
  } catch (error) {
    res.status(500).render('error', { error });
  }
};

exports.deleteGoal = async (req, res) => {
  try {
    const goal = await goalsService.deleteGoal(req.params.id);
    if (!goal) {
      return res.status(404).render('error', { error: 'Goal not found' });
    }
    res.redirect('/goals');
  } catch (error) {
    res.status(500).render('error', { error });
  }
}; 