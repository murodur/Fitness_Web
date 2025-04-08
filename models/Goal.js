const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['weight', 'running', 'strength', 'other']
  },
  targetDate: {
    type: Date,
    required: true
  },
  currentValue: {
    type: Number,
    default: 0
  },
  targetValue: {
    type: Number,
    required: true
  },
  progress: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Обновление поля updatedAt перед сохранением
goalSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Расчет прогресса
goalSchema.methods.calculateProgress = function() {
  this.progress = (this.currentValue / this.targetValue) * 100;
  return this.progress;
};

module.exports = mongoose.model('Goal', goalSchema); 