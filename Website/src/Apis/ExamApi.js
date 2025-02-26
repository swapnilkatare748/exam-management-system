import axios from "axios";

const API_BASE_URL = "http://localhost:8049/apis/exam";


// Function to add a new exam
export const addExam = async (examData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add`, examData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to add exam.";
  }
};

 // Function to get all exams
export const getAllExams = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch exams.";
  }
};

export const deleteExam = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to delete exam.";
  }
};


export const getExamById = async (examId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${examId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch exam details.";
  }
};