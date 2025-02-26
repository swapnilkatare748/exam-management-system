import React, { useState } from "react";
import styles from "./AddExam.module.css";
import { addExam } from "../../../Apis/ExamApi";

const AddExam = () => {
  const [formData, setFormData] = useState({
    examName: "",
    duration: "",
    description: "",
    category: "",
    Questions: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.examName || !formData.duration || !formData.description) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const response = await addExam(formData);
      alert(response.message); // ✅ FIXED: Correct API response handling
      setFormData({
        examName: "",
        duration: "",
        description: "",
        category: "",
        Questions: "", // ✅ Ensure Questions resets correctly
      });
    } catch (error) {
      console.error("Error adding exam:", error);
      alert(error?.response?.data?.message || error.message || "Failed to add exam.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Exam Name *</label>
          <input
            type="text"
            name="examName"
            value={formData.examName}
            onChange={handleChange}
            placeholder="Enter exam name"
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Duration (in minutes) *</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Enter duration"
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label> Questions  * </label>
          <input
            type="number"
            name="Questions"
            value={formData.Questions}
            onChange={handleChange}
            placeholder="Enter number of Questions"
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter exam description"
            required
            className={styles.textarea}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={styles.input}
          >
            <option value="">Select Category</option>
            <option value="aptitude">Aptitude</option>
            <option value="reasoning">Reasoning</option>
            <option value="verbal">Verbal</option>
            <option value="technical">Technical</option>
          </select>
        </div>

        <button type="submit" className={styles.submitButton}>Add Exam</button>
      </form>
    </div>
  );
};

export default AddExam;
