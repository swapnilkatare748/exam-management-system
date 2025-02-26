import React, { useState, useEffect } from 'react';
import styles from './AddQuations.module.css';
import BtnPrimary from '../../buttons/BtnPrimary/BtnPrimary';
import { getAllExams } from '../../../Apis/ExamApi'; 
import {addQuestion} from '../../../Apis/QuestionsApi';


function AddQuestions() {  
  
  const [exams, setExams] = useState([]); 
  
  

  const [selectedExam, setSelectedExam] = useState(""); // 
  const [questions, setQuestions] = useState([]); //Store questions for the selected exam

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '','']);
  const [correct, setCorrect] = useState('');

  const MAX_QUESTIONS = selectedExam 
  ? exams.find(exam => exam._id === selectedExam)?.Questions || 10 
  : 10;

  // Fetch available exams from the backend
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const data = await getAllExams();
        setExams(data.exams || []); 
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };
    fetchExams();
  }, []);



  // ✅ Handle option change
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  //  Handle exam selection
  const handleExamChange = async (e) => {
    const examId = e.target.value;
    setSelectedExam(examId);
  
    try {
      const examData = exams.find(exam => exam._id === examId);
      setQuestions(examData?.questions || []); // Fetch existing questions if available
    } catch (error) {
      console.error("Error fetching questions for selected exam:", error);
    }
  };
  
 //  Handle form submission

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedExam) {
    alert("Please select an exam before adding questions.");
    return;
  }

  if (options.some(opt => opt.trim() === "")) {
    alert("All options must be filled.");
    return;
  }
  

  if (questions.length >= MAX_QUESTIONS) {
    alert(`This exam can only have up to ${MAX_QUESTIONS} questions.`);
    return;
  }

  if (!correct) {
    alert("Please select a correct answer before submitting.");
    return;
  }

  // ✅ Create a new question object
  const newQuestion = {
    text: question,
    options,
    correct,
    examId: selectedExam, // ✅ Attach to the selected exam
  };

  try {
    const response = await addQuestion(newQuestion);
    console.log("this is an quation data : ",newQuestion);

    console.log("API Response:", response); // Debugging: Check the response structure
  
      alert("Question added successfully!");
  
      //Update the question list
      setQuestions([...questions, response.newQuestion]);
  
      // Reset form fields
      setQuestion("");
      setOptions(['', '', '', '']);
      setCorrect("");
    
  } catch (error) {
    console.error("Error adding question:", error);
  }
  
};


  return (
    <div className={styles.AddQuestions}>
      <h2 className={styles.heading}>Add Questions to an Exam</h2>

      {/*  Select Exam Dropdown */}
      <div className={styles.inputGroup}>
        <label>Select Exam:</label>
        <select value={selectedExam} onChange={handleExamChange} required>
          <option value="">-- Select an Exam --</option>
          {exams.map((exam) => (
            <option key={exam._id} value={exam._id}>{exam.examName}</option>
          ))}
        </select>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Question:</label>
          <input 
            type="text" 
            placeholder="Enter the question" 
            value={question} 
            onChange={(e) => setQuestion(e.target.value)} 
            required
          />
        </div>

        {options.map((option, index) => (
          <div key={index} className={styles.inputGroup}>
            <label>Option {index + 1}:</label>
            <input 
              type="text" 
              placeholder={`Enter Option ${index + 1}`} 
              value={option} 
              onChange={(e) => handleOptionChange(index, e.target.value)} 
              required
            />
          </div>
        ))}

        <div className={styles.inputGroup}>
          <label>Correct Answer:</label>
          <select 
            value={correct} 
            onChange={(e) => setCorrect(e.target.value)} 
            required
          >
            <option value="" disabled>Select correct answer</option>
            {options
              .filter((opt) => opt.trim() !== "") // ✅ Ignore empty options
              .map((opt, index) => (
                <option key={index} value={opt}>{opt}</option>
              ))
            }
          </select>
        </div>

        <BtnPrimary text="Add Question" type="submit" />
      </form>
    </div>
  );
}

export default AddQuestions;
