import axios from 'axios';

const API_URL = 'http://localhost:8049/apis/quetion';

// Get all questions
export const getAllQuestions = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

// Get a single question by ID
export const getQuestionById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching question:', error);
    throw error;
  }
};

// Add a new question
export const addQuestion = async (questionData) => {
  try {
    const response = await axios.post(`${API_URL}/add`, questionData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding question:', error);
    throw error;
  }
};

// Update a question
export const updateQuestion = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating question:', error);
    throw error;
  }
};

// Delete a question
export const deleteQuestion = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting question:', error);
    throw error;
  }
};
