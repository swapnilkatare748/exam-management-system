import React, { useState,useEffect } from "react";
import styles from "./ExamPanel.module.css"; // Import modular CSS
import WebsiteWrapper from "../../WebsiteWrapper";
import { COMPANY_NAME, Exam_Details, fetchQuestions ,examId } from "../../../Data";
import PrimaryPopup from "../../Popup/PrimaryPopup/PrimaryPopup";
import BtnPrimary from "../../buttons/BtnPrimary/BtnPrimary";
import QuationsNumberUser from "./Quactions/QuationsNumberUser";
import { getExamById } from "../../../Apis/ExamApi";
import { getAllQuestions } from "../../../Apis/QuestionsApi";

const ExamPanel = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const totalQuestions = Exam_Details[0].Number_of_Quations;
  // For the exam score
  console.log("quations",questions);

  const [showPopup, setShowPopup] = useState(false);
  const [examScore, setExamScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    Array(totalQuestions).fill(null)
  );

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleAnswerSelect = (option) => {
    if (userAnswers[currentQuestionIndex] === null) {
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestionIndex] = option;
      setUserAnswers(newAnswers);

      if (option === questions[currentQuestionIndex].correct) {
        setExamScore(examScore + 1);
      } else {
        setWrongAnswers(wrongAnswers + 1);
      }
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmitTest = async () => {
    const userData = {
      userId: Exam_Details[0].id,
      userName: Exam_Details[0].User_name,
      examName: Exam_Details[0].Exam_name,
      totalQuestions: totalQuestions,
      correctAnswers: examScore,
      wrongAnswers: wrongAnswers,
      notAttempted: totalQuestions - (examScore + wrongAnswers),
      userResponses: userAnswers, // Sends the answers user selected
    };
  
    try {
      const response = await fetch("https://your-backend-api.com/submit-exam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        console.alert("Exam submitted successfully!");
        setShowPopup(true); // Show confirmation popup
      } else {
        console.alert("Failed to submit the exam");
        alert("Something went wrong while submitting the exam. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting exam:", error);
      alert("Network error. Please check your connection.");
    }
  };
  

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const fetchedQuestions = await fetchQuestions();
        if (Array.isArray(fetchedQuestions) && fetchedQuestions.length > 0) {
          setQuestions(fetchedQuestions);
          setUserAnswers(new Array(fetchedQuestions.length).fill(null));
        } else {
          console.error("No questions found for this exam.");
        }
      } catch (error) {
        console.error("Error loading questions:", error);
      }
    };

    loadQuestions();
  }, []);



  return (
    <WebsiteWrapper>
      <div className={styles.main}>
        <div className={styles.mainsub}>
          {/* Exam Heading */}
          <div className={styles.heading}>
            <h1>{Exam_Details[0].Exam_name}</h1>
          </div>

          {/* User Details */}
          <div className={styles.userDetails}>
            <div>
              <p>
                <b>User Name:</b> {Exam_Details[0].User_name}
              </p>
              <p>
                <b>ID:</b> {Exam_Details[0].id}
              </p>
            </div>
            <h5>Time: {Exam_Details[0].Time} min</h5>
          </div>
          {/* Score and Wrong Answer Count */}
          {/* <div className={styles.scoreSection}>
            <p>
              <b>Score:</b> {examScore}
            </p>
            <p>
              <b>Wrong Answers:</b> {wrongAnswers}
            </p>
            <p>
              <b>Not Attempted:</b>{" "}
              {totalQuestions - (examScore + wrongAnswers)}
            </p>
          </div> */}

          {/* Question Section */}
          <div className={styles.questionSection}>
            <div className={styles.question}>
              <div className={styles.que}>
                <h3>Question {currentQuestionIndex + 1}:</h3>
                <p>{questions[currentQuestionIndex]?.text}</p>
                </div>
              <div className={styles.options}>
              {questions[currentQuestionIndex]?.options.map((option, index) => (
        <div
          key={index}
          className={`${styles.opt} ${
            userAnswers[currentQuestionIndex] === option
              ? styles.selectedOption
              : ""
          }`}
          onClick={() => handleAnswerSelect(option)}
        >
          <p>
            <span>{String.fromCharCode(65 + index)}. </span> {option}
          </p>
        </div>
      ))}
              </div>
            </div>

            {/* Question Numbers */}
            <QuationsNumberUser
              totalQuestions={totalQuestions}
              currentQuestionIndex={currentQuestionIndex}
              handleQuestionClick={handleQuestionClick}
            />
          </div>

          {/* Navigation Buttons */}
          <div className={styles.buttons}>
            <button onClick={handlePrev} disabled={currentQuestionIndex === 0}>
              Previous
            </button>
            <div className={styles.buttonsLast}>
              <button
                onClick={handleNext}
                disabled={currentQuestionIndex === totalQuestions - 1}
              >
                Next
              </button>
              <div className={styles.submitTestBtn} onClick={handleSubmitTest}>
                <BtnPrimary text="END TEST" />
                {showPopup && (
                  <PrimaryPopup
                    message="Thank you for completing the test!"
                    onClose={() => setShowPopup(false)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </WebsiteWrapper>
  );
};

export default ExamPanel;
