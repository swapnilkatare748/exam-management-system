const COMPANY_NAME = "Exam Portal";
const userName = localStorage.getItem("userName");
const userId = localStorage.getItem("userId");
const userRole = localStorage.getItem("userRole");
const examId = localStorage.getItem("examId");

console.log("User Role from data file:", userRole);

import { getExamById } from "./Apis/ExamApi";
import { getAllQuestions } from "./Apis/QuestionsApi";

let Exam_Details = [
  {
    Exam_name: "",
    id: userId,
    User_name: userName,
    Number_of_Quations: 0,
    Time: 0,
  },
];

// Function to fetch and update Exam_Details
const fetchExamDetails = async () => {
  try {
    if (examId) {
      const response = await getExamById(examId);
    ;
      Exam_Details = [
        {
          Exam_name: response.exam.examName || "Exam Name",
          id: response.exam.userId || userId,
          User_name: response.exam.userName || userName,
          Number_of_Quations: response.exam.Questions || 0,
          Time: response.duration || 0,
        },
      ];
    }
  } catch (error) {
    console.error("Error fetching exam details:", error);
  }
};

console.log(Exam_Details);

// Call function to fetch details
fetchExamDetails();

let questions = []; 


// const fetchQuestions = async () => {
//   try {
//     const response = await getAllQuestions();
    
//     console.log("API Response for Questions:", response); // Debugging: Check response structure

//     // Filter questions that match the examId
//     const filteredQuestions = response.filter(q => q.examId === examId);

//     // Format the filtered questions to match the required structure
//     questions = filteredQuestions.map((q, index) => ({
//       id: index + 1, // Assign a sequential ID
//       text: q.text,
//       options: q.options,
//       correct: q.correct
//     }));

//     console.log("questions",questions);


//     console.log("Filtered Questions:", questions);
//   } catch (error) {
//     console.error("Error fetching questions:", error);
//   }
// };

// fetchQuestions();

const fetchQuestions = async () => {
  try {
    const response = await getAllQuestions();
    if (!response || !Array.isArray(response)) {
      console.error("Invalid response format:", response);
      return [];
    }

    // Return all questions that match the current examId
    return response
      .filter(q => q.examId === examId)
      .map((q, index) => ({
        id: index + 1, // Assign a sequential ID
        text: q.text,
        options: q.options,
        correct: q.correct,
      }));
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};




const studentMarks = [
  { name: "Alice", marks: 85 },
  { name: "Bob", marks: 90 },
  { name: "Charlie", marks: 75 },
  { name: "David", marks: 80 },
  { name: "Eve", marks: 95 },
];

export { COMPANY_NAME, examId, userName, userRole, Exam_Details, fetchQuestions, studentMarks };
