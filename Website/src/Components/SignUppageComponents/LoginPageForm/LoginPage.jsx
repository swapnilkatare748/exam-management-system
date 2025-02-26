import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import styles from "./LoginPage.module.css"; // Add custom CSS for styling
import { FiCodesandbox } from "react-icons/fi";
import { COMPANY_NAME } from "../../../Data.jsx"

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    try {
      const response = await axios.post("http://localhost:8049/apis/auth/login", {
        email,
        password,
      });

      // Extract token and user details
      const { token, user } = response.data;
      console.log("user : ",user);
      console.log(token);
      // Save token and user details in local storage
      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", user._id);
      localStorage.setItem("loggedIn", "true");
      console.log("user id is ",user._id);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userRole", user.isAdmin);
      
      localStorage.setItem("examId",user.examId);
      
      alert("Login successful!");
      console.log("user type in login : ",response.data.user.isAdmin);

     if(user.isAdmin === "admin"){
      navigate("/admin");
     }else{
      navigate("/exam");
     }


    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <div className={styles.logo}>
                 <FiCodesandbox className="icon" />
                 <h3>{COMPANY_NAME}</h3>
              
                 </div>
        <h2 className={styles.login_name}>Login</h2>

        {/* Display error message */}
        {error && <div className={styles.error}>{error}</div>}

        {/* Email Input */}
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label} >Email</label>
          <input
            type="email"
            id="email"
            value={email}
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Input */}
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label} >Password</label>
          <input
            type="password"
            id="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.loginButton}>
          Login
        </button>

        <div className={styles.login_text}>
            <div className={styles.text_login}>
            <p className={styles.link}> <Link to="/signUp">Sign Up</Link></p> 
            <p className={styles.link}> <Link to="/Forgate Password" className={styles.ForgatePassword}>Forgate Password</Link></p>
            </div>
        </div>

      </form>
    </div>
  );
};

export default LoginPage;
