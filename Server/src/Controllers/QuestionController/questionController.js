
const Question = require('../../models/QuestionModule/QuestionModule');

// Get all questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching questions' });
  }
};

// Get a single question by ID
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching question' });
  }
};

// Add a new question
exports.addQuestion = async (req, res) => {
  try {
    const { text, options, correct, examId } = req.body;
    const newQuestion = new Question({ text, options, correct, examId });
    await newQuestion.save();
    res.status(201).json({ message: 'Question added successfully..', newQuestion });
  } catch (error) {
    res.status(500).json({ error: 'Error adding question' });
  }
};

// Update a question
exports.updateQuestion = async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedQuestion) return res.status(404).json({ error: 'Question not found' });
    res.json({ message: 'Question updated successfully', updatedQuestion });
  } catch (error) {
    res.status(500).json({ error: 'Error updating question' });
  }
};

// Delete a question
exports.deleteQuestion = async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
    if (!deletedQuestion) return res.status(404).json({ error: 'Question not found' });
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting question' });
  }
};
