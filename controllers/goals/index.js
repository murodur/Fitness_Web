const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const goalsPath = path.join(__dirname, '../../data/goals.json');

function readGoals() {
  const data = fs.readFileSync(goalsPath, 'utf8');
  return JSON.parse(data);
}

function writeGoals(goals) {
  fs.writeFileSync(goalsPath, JSON.stringify(goals, null, 2));
}

exports.getAllGoals = async (req, res) => {
  try {
    const goals = readGoals();
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getNewGoalForm = (req, res) => {
  res.render('goals/new', { goal: null });
};

exports.getEditGoalForm = async (req, res) => {
  try {
    const goals = readGoals();
    const goal = goals.find(g => g.id === parseInt(req.params.id));
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
    const goals = readGoals();
    const goal = goals.find(g => g.id === parseInt(req.params.id));
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
    const goals = readGoals();
    const newGoal = { ...req.body, id: goals.length + 1 }; // Add an ID
    goals.push(newGoal);
    writeGoals(goals);
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateGoal = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('goals/edit', { 
      errors: errors.array(),
      goal: { ...req.body, id: req.params.id }
    });
  }

  try {
    const goals = readGoals();
    const goalIndex = goals.findIndex(g => g.id === parseInt(req.params.id));
    if (goalIndex === -1) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    const updatedGoal = { ...goals[goalIndex], ...req.body };
    goals[goalIndex] = updatedGoal;
    writeGoals(goals);
    res.json(updatedGoal);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteGoal = async (req, res) => {
  try {
    const goals = readGoals();
    const goalIndex = goals.findIndex(g => g.id === parseInt(req.params.id));
    if (goalIndex === -1) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    goals.splice(goalIndex, 1);
    writeGoals(goals);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error });
  }
};