// questionModel.js

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: { type: [String], required: true },
  correct: { type: String, required: true },
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true }
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
