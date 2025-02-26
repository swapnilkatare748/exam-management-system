import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./SignUP.module.css"; // Import modular CSS
import { FiCodesandbox } from "react-icons/fi";
import { COMPANY_NAME } from "../../../Data.jsx";
import { useNavigate } from "react-router-dom";


const RegistrationForm = () => {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "", // Corrected camelCase
    role: "", // Default to 'user'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form refresh

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  console.log("form data : ",formData);
    try {
      const response = await axios.post(
        "http://localhost:8049/apis/auth/register",  // Ensure correct API endpoint
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword, // Include confirmPassword
          role: formData.role, // Convert to boolean for backend
        },
        { headers: { "Content-Type": "application/json" } }
      );
  
      alert(response.data.message);
  
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user",
      });
  
      navigate("/login");

    } catch (error) {
      console.error("Error during registration:", error);
  
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Error during registration. Please try again.");
      }
    }
   
  };
  

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <div className={styles.logo}>
          <FiCodesandbox className="icon" />
          <h3>{COMPANY_NAME}</h3>
        </div>
      </div>
      <h2 className={styles.heading}>SignUp</h2>
      <div className={styles.content}>
        <div className={`${styles.inputGroup} ${styles.redioGroup}`}>
          <label>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={formData.role === "admin"}
              onChange={handleChange}
            />
            Admin
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="user"
              checked={formData.role === "user"}
              onChange={handleChange}
            />
            User
          </label>
        </div>
        <div className={styles.inputGroup}>
          <input
            name="name"
            placeholder="Name"
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
        Sign Up
      </button>

       <div className={styles.login_text}>
                  <div className={styles.text_login}>   
                  <p className={styles.link}> <Link to="/login">Login</Link></p> 
                  </div>
        </div>
    </form>
  );
};

export default RegistrationForm;
