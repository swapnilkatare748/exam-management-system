// models/examModel.js

const  mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    examName: { type: String, required: true },
    duration: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, enum: ["aptitude", "reasoning", "verbal", "technical"] },
    Questions: { type: Number, required: true },
  },
  { timestamps: true }
);

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;