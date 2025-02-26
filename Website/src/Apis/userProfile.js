import axios from "axios";

// Base URL for the API
const BASE_URL = "http://localhost:8000";

// Function to fetch user profile
export const fetchUserProfile = async (userId, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token if required
      },
    });
    return response.data; // Return the user data
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch user information";
  }
};
