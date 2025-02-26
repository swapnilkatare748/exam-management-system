const express = require('express');
const {deleteQuestion,updateQuestion,addQuestion,getQuestionById,getAllQuestions } = require('../Controllers/QuestionController/questionController');

const router = express.Router();

// http://localhost:8049/apis/quetion

router.get('/',getAllQuestions);
router.post('/add',addQuestion);
router.get('/:id',getQuestionById);
router.put('/update/:id',updateQuestion);
router.delete('/delete/:id',deleteQuestion);


module.exports = router