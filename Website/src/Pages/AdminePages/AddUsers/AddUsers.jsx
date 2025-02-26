import React, { useState, useEffect } from "react";
import styles from './AddUsers.module.css';
import WebsiteWrapper from '../../../Components/WebsiteWrapper/index';
import axios from "axios";
import BtnPrimary from "../../../Components/buttons/BtnPrimary/BtnPrimary";
import { getAllExams } from "../../../Apis/ExamApi"; // Import function to fetch exams

function AddUsers() {
    const [exams, setExams] = useState([]); // Store exams list
    const [selectedExam, setSelectedExam] = useState(""); // Store selected exam

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user",
    });

    // Fetch available exams on component mount
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleExamChange = (e) => {
        setSelectedExam(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedExam) {
            alert("Please select an exam before adding a user.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8049/apis/auth/register",
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword:formData.confirmPassword,
                    role: formData.role,
                    examId: selectedExam, // Attach selected exam ID
                },
                { headers: { "Content-Type": "application/json" } }
            );

            alert(response.data.message);
          
            console.log("responce : ",response);

            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                role: "user",
            });

        } catch (error) {
            console.error("Error adding user:", error);

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Error adding user. Please try again.");
            }
        }
    };

    return (
        <WebsiteWrapper>
            <div className={`flex ${styles.addUserPage}`}>
                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    <h2 className={styles.heading}>Add User</h2>

                    <div className={styles.inputGroup}>
                        <label>Select Exam:</label>
                        <select value={selectedExam} onChange={handleExamChange} required>
                            <option value="">-- Select an Exam --</option>
                            {exams.map((exam) => (
                                <option key={exam._id} value={exam._id}>
                                    {exam.examName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.inputGroup}>
                            <input
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </div>
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        Add User
                    </button>
                </form>
            </div>
        </WebsiteWrapper>
    );
}

export default AddUsers;
