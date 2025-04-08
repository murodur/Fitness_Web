const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/goals.json');

const goalSchema = {
  title: String,
  description: String,
  type: String,
  targetDate: Date,
  currentValue: Number,
  targetValue: Number,
  progress: Number,
  createdAt: Date,
  updatedAt: Date
};

module.exports = goalSchema;