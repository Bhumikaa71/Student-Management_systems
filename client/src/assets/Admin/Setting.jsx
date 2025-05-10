import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";
import "./setting.css";
// import Sidebar from "./Sidebar";


const Setting = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: ""
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    const token = localStorage.getItem("authToken");

    if (!data || !token) {
      navigate("/Setting"); // Redirect to login if not authenticated
    } else {
      setUserData(data);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(userData));
    alert("Settings updated successfully!");
  };

  return (
    <div className="setting-container">
      <div className="setting-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <h2>Settings</h2>
      </div>

      <form className="setting-content" onSubmit={handleSave}>
        <div className="setting-section">
          <h3>Account Info</h3>

          <div className="setting-item">
            <label><FaUser /> Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="setting-item">
            <label><FaEnvelope /> Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="setting-section">
          <h3>Security</h3>

          <div className="setting-item">
            <label><FaLock /> Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              name="password"
              disabled
              title="Password change not supported in this demo"
            />
          </div>
        </div>

        <button type="submit" className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Setting;
