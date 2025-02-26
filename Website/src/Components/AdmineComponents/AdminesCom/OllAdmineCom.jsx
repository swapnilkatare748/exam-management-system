import React, { useState, useRef, useEffect } from "react";
import styles from "./OllAdmineCom.module.css";
import { HiOutlineDotsVertical } from "react-icons/hi";
import userimag from '../../../assets/profile/User_defolt.webp';
import axios from "axios";

function UserProfile() {
  const [activeUserId, setActiveUserId] = useState(null);
  const popupRef = useRef(null);
  const [agents, setAgents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleAction = (id) => {
    setActiveUserId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setActiveUserId(null);
      }
    };

    if (activeUserId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeUserId]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:8049/apis/auth/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Filter only admin users
        const adminUsers = response.data.filter(user => user.role === "admin");
  
        setAgents(adminUsers);
        localStorage.setItem("usersData", JSON.stringify(adminUsers));
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  


  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:8049/apis/auth/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAgents((prevAgents) => prevAgents.filter((agent) => agent._id !== id));
      setActiveUserId(null);
      alert("User deleted successfully");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user");
    }
  };

  return (
    <div className={styles.UserProfile}>

      <table className={styles.table}>
        <thead>
          <tr>
            <td>Sr</td>
            <td>Profile</td>
            <td>Name</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {agents.length > 0 ? (
            agents.map((agent, index) => (
              <tr key={agent._id}>
                <td>{index + 1}</td>
                <td>
                  <div className={styles.profile}>
                    <img src={agent.profile || userimag} alt="Profile" />
                  </div>
                </td>
                <td>{agent.name}</td>
                <td>{agent.role}</td>
                <td>
                  <button className={styles.Treedot} onClick={() => handleAction(agent._id)}>
                    <HiOutlineDotsVertical />
                  </button>
                  {activeUserId === agent._id && (
                    <div className={styles.userPopup} ref={popupRef}>
                      <div className={styles.chDiv} onClick={() => setActiveUserId(null)}>Edit</div>
                      <div className={styles.chDiv} onClick={() => handleDeleteUser(agent._id)}>Delete</div>
                      <div className={styles.chDiv} onClick={() => setActiveUserId(null)}>Update</div>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>No agents found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}




export default UserProfile;
