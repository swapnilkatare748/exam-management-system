const express = require("express");
const {updateExam,deleteExam,addExam,getAllExams,getExamById} = require('../Controllers/ExamControllers/ExamController');


const router = express.Router();
// routes for the Exam sections 
//http://localhost:8049/apis/exam/


router.get('/all',getAllExams);
router.post('/add',addExam);
router.put('/update',updateExam);
router.delete('/delete/:id',deleteExam);
router.get('/:id',getExamById);

module.exports = router;

