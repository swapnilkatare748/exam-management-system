import React from "react";
import styles from "./QuationsNumberUser.module.css"; // Ensure you create a corresponding CSS file

function QuationsNumberUser({ totalQuestions, currentQuestionIndex, handleQuestionClick }) {
 
 
  return (

    <div className={styles.numbers}>
      {Array.from({ length: totalQuestions }, (_, i) => (
        <div
          key={i}
          className={`${styles.num} ${currentQuestionIndex === i ? styles.activeNum : ""}`}
          onClick={() => handleQuestionClick(i)}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}

export default QuationsNumberUser;
