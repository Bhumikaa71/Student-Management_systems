import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaSchool, FaUserTag, FaArrowLeft } from "react-icons/fa";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    school: "",
    role: ""
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    const authToken = localStorage.getItem("authToken");
    
    if (!data || !authToken) {
      navigate("/admin/profile");
    } else {
      setUserData({
        name: data.name || "Not available",
        email: data.email || "Not available",
        school: data.school || "Not available",
        role: data.role || "Not available"
      });
    }
  }, [navigate]);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <h2>Profile</h2>
      </div>
      
      <div className="profile-content">
        <div className="profile-avatar">
          {userData.name.charAt(0).toUpperCase()}
        </div>
        
        <div className="profile-info">
          <div className="info-item">
            <FaUser className="info-icon" />
            <div>
              <label>Name</label>
              <p>{userData.name}</p>
            </div>
          </div>
          
          <div className="info-item">
            <FaEnvelope className="info-icon" />
            <div>
              <label>Email</label>
              <p>{userData.email}</p>
            </div>
          </div>

          <div className="info-item">
            <FaSchool className="info-icon" />
            <div>
              <label>School</label>
              <p>{userData.school}</p>
            </div>
          </div>

          <div className="info-item">
            <FaUserTag className="info-icon" />
            <div>
              <label>Role</label>
              <p>{userData.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;