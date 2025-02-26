import React, { useEffect, useState } from "react";
import styles from "./ViewExam.module.css";
import { getAllExams,deleteExam } from "../../../Apis/ExamApi";
import { CiMenuKebab } from "../../../Utils/Icons.js";
import { useRef } from "react";

const ViewExams = () => {
  const [exams, setExams] = useState([]);
  const [error, setError] = useState(null);
  const [activeUserId, setActiveUserId] = useState(null);

  const popupRef = useRef(null);
  

  const handleAction = (id) => {
    setActiveUserId((prevId) => (prevId === id ? null : id));
  };

  const fetchExams = async () => {
    try {
      const data = await getAllExams();
      setExams(data.exams || data); // ✅ Ensure correct API response handling
    } catch (error) {
      console.error("Error fetching exams:", error);
      setError(error?.message || "Failed to fetch exams."); // ✅ Store error message
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await deleteExam(id); // ✅ Wait for API response
      alert(response.message || "Exam deleted successfully!");
      fetchExams(); // ✅ Refresh exam list after deletion
    } catch (error) {
      setError(error?.message || "Failed to delete exam.");
      alert("Failed to delete exam.");
    }
  };
  

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Exam List</h2>
      {error && <p className={styles.error}>{error}</p>}{" "}
      {/* ✅ Show error if exists */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Exam Name</th>
            <th>Duration (mins)</th>
            <th>Questions</th> {/* ✅ Added Questions column */}
            <th>Description</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {exams.length > 0 ? (
            exams.map((exam, index) => (
              <tr key={exam._id}>
                <td>{index + 1}</td>
                <td>{exam.examName}</td>
                <td>{exam.duration}</td>
                <td>{exam.Questions || "N/A"}</td>{" "}
                {/* ✅ Show Questions count */}
                <td>{exam.description}</td>
                <td>{exam.category || "N/A"}</td>
                <td>
                  <button
                    className={styles.Treedot}
                    onClick={() => handleAction(exam._id)}
                  >
                  <CiMenuKebab />
                  </button>
                  {activeUserId === exam._id && (
                    <div className={styles.userPopup} ref={popupRef}>
                      <div
                        className={styles.chDiv}
                        onClick={() => setActiveUserId(null)}
                      >
                        View
                      </div>
                      <div
                        className={styles.chDiv}
                        onClick={() => handleDeleteUser(exam._id)}
                      >
                        Delete
                      </div>
                      <div
                        className={styles.chDiv}
                        onClick={() => setActiveUserId(null)}
                      >
                        Update
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className={styles.noData}>
                No exams available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewExams;
