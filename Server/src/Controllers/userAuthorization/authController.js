const User = require('../../models/UserModule/UserModule');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require('../../utils/sendEmail.js');
const {AppName,ExamPanelURL } = require("../../constants.js");

require("dotenv").config();

const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role ,examId} = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Debugging Step
    console.log("Password received:", password);

    // Validate password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Ensure password is a string before hashing
    if (typeof password !== "string") {
      return res.status(400).json({ message: "Invalid password format" });
    }

    // Hash password

    // Create a new user
    const newUser = new User({
      name,
      email,
      password, // Store hashed password
      role,
      examId,
    });
   console.log("new user ", newUser);
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    await sendEmail({
      to: email,
      subject: `Welcome to ${AppName}!`,
      text: `Hello ${name},
  
 \n You have successfully registered for ${AppName}.
  
 \n\n User Details:
  --------------------
  \nUsername: ${email}
  \nPassword: ${password}
  
  \n\nAccess your Exam Panel here: ${ExamPanelURL}
  
  \nBest regards,
  ${AppName} Team`,
  
      html: `
      <p>Hello <strong>${name}</strong>,</p>
      <p>You have successfully registered for <strong>${AppName}</strong>.</p>
      
      <h3>User Details:</h3>
      <p><strong>Username:</strong> ${email}</p>
      <p><strong>Password:</strong> ${password}</p>
  
      <p>Click <a href="${ExamPanelURL}" target="_blank"><strong>here</strong></a> to access your Exam Panel.</p>
      
      <hr>
      <p>Best regards,<br><strong>${AppName} Team</strong></p>
      `
  });
  
    res.status(201).json({ 
      message: "User registered successfully", 
      token, 
      user: { id: newUser._id, name: newUser.name, email: newUser.email, isAdmin: newUser.role, examId:newUser.examId }
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }    
   

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      message: "Login successful",
      token,
      user: { _id: user._id, name: user.name, email: user.email, isAdmin : user.role, examId: user.examId }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "_id name email role");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = { registerUser,loginUser,getAllUsers,deleteUser};
