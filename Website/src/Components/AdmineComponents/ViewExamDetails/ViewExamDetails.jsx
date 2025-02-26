import React, { useState, useEffect } from "react";
import { getAllExams } from "../../../Apis/ExamApi";
import { getAllQuestions, deleteQuestion, updateQuestion } from "../../../Apis/QuestionsApi";
import styles from "./ViewExamDetails.module.css"; // Import CSS
import DeleteButton from "../../buttons/DeleteButton/DeleteButton";
import EditButton from "../../buttons/EditButton/EditButton";
import BtnPrimary from"../../buttons/BtnPrimary/BtnPrimary";

function ViewExamDetails() {
  const [exams, setExams] = useState([]); 
  const [selectedExam, setSelectedExam] = useState(null);
  const [questions, setQuestions] = useState([]); 
  const [filteredQuestions, setFilteredQuestions] = useState([]); 
  const [editingQuestion, setEditingQuestion] = useState(null); // Store question being edited
  const [updatedText, setUpdatedText] = useState(""); // Store updated text


  

  // Fetch exams
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

  // Fetch all questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getAllQuestions();
        setQuestions(data || []);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  // Handle exam selection and filter questions
  const handleExamChange = (e) => {
    const examId = e.target.value;
    const examData = exams.find((exam) => exam._id === examId);
    setSelectedExam(examData || null);

    const filtered = questions.filter((q) => q.examId === examId);
    setFilteredQuestions(filtered);
  };

  // Handle Delete Operation
  const handleDelete = async (id) => {
    console.log("delete ",id);
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await deleteQuestion(id);
        setQuestions(questions.filter((q) => q._id !== id)); // Remove question from state
        setFilteredQuestions(filteredQuestions.filter((q) => q._id !== id)); // Update filtered list
      } catch (error) {
        console.error("Error deleting question:", error);
      }
    }
  };

  // Handle Edit Operation
  const handleEdit = (question) => {
    console.log("delete ",question);
    setEditingQuestion(question);
    setUpdatedText(question.text);
  };

  // Handle Save Updated Question
  const handleSave = async () => {
    try {
      const updatedQuestion = { ...editingQuestion, text: updatedText };
      await updateQuestion(editingQuestion._id, updatedQuestion);
      
      const updatedQuestions = questions.map((q) =>
        q._id === editingQuestion._id ? updatedQuestion : q
      );

      setQuestions(updatedQuestions);
      setFilteredQuestions(updatedQuestions.filter((q) => q.examId === selectedExam._id));
      setEditingQuestion(null);
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  return (
    <div className={styles.viewExamDetails}>
      <h3 className={styles.heading}>View Exam Details</h3>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Select Exam:</label>
        <select className={styles.select} onChange={handleExamChange} defaultValue="">
          <option value="" disabled>-- Select an Exam --</option>
          {exams.map((exam) => (
            <option key={exam._id} value={exam._id}>
              {exam.examName}
            </option>
          ))}
        </select>
      </div>

      {selectedExam && (
        <div className={styles.examDetails}>
          <h3 className={styles.examTitle}>{selectedExam.examName}</h3>
          <p className={styles.examInfo}><strong>Category:</strong> {selectedExam.category}</p>
          <p className={styles.examInfo}><strong>Total Duration:</strong> {selectedExam.duration} minutes</p>
          <p className={styles.examInfo}><strong>Total Questions:</strong> {filteredQuestions.length}</p>

          <h4 className={styles.examInfo}>Questions:</h4>
          <ul className={styles.questionList}>
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((q, index) => (
                <li key={q._id} className={styles.questionItem}>
                  {editingQuestion?._id === q._id ? (
                    <>
                      <input
                        type="text"
                        value={updatedText}
                        onChange={(e) => setUpdatedText(e.target.value)}
                        className={styles.editInput}
                      />
                      <BtnPrimary text="Save"  onClick={handleSave} className={styles.saveBtn} />
                      <DeleteButton onClick={() => setEditingQuestion(null)} className={styles.cancelBtn} text="Cancle"/>
                    </>
                  ) : (
                    <>
                      <strong className={styles.questionText}>Q {index + 1}:</strong> {q.text}
                      <div className={styles.questionOptions}>
                        {q.options.map((option, i) => (
                          <span key={i} className={styles.optionItem}>{option}</span>
                        ))}
                      </div>
                     <div className={styles.lastSection}>
                     <p className={styles.correctAnswer}>
                        <strong>Correct Answer:</strong> {q.correct}
                      </p>
                     <div className={styles.buttonsSection}>
                     <EditButton text="Edit" onClick={() => handleEdit(q)} className={styles.editBtn} /> 
                     <DeleteButton text="Delete" onClick={() => handleDelete(q._id)} className={styles.deleteBtn}  />
                     </div>
                     </div>
                    </>
                  )}
                </li>
              ))
            ) : (
              <p className={styles.examInfo}>No questions available for this exam.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ViewExamDetails;
