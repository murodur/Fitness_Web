const Goal = require('../../models/Goal');

exports.getAllGoals = async () => {
  return await Goal.find().sort({ createdAt: -1 });
};

exports.getGoalById = async (id) => {
  return await Goal.findById(id);
};

exports.createGoal = async (goalData) => {
  const goal = new Goal(goalData);
  return await goal.save();
};

exports.updateGoal = async (id, goalData) => {
  return await Goal.findByIdAndUpdate(id, goalData, { new: true });
};

exports.deleteGoal = async (id) => {
  return await Goal.findByIdAndDelete(id);
}; 