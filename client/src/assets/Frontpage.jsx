import React from "react";
import "./Frontpage.css";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import bgImage from "../assets/Image/Frontpage.png"; // ✅ Import image

const Frontpage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="frontpage-wrapper"
      style={{ backgroundImage: `url(${bgImage})` }} // ✅ Inline style
    >
      <div className="content-overlay">
        <div className="hero-section">
          <h1>Welcome to Student Record Management</h1>
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>

        <div className="features-section">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-item">✓ Automated Attendance</div>
            <div className="feature-item">✓ Student Performance Tracking</div>
            <div className="feature-item">✓ Custom Reports</div>
            <div className="feature-item">✓ Multi-User Role Access</div>
          </div>
        </div>

        <footer className="footer">
          <div className="footer-left">
            <span className="icon">✉</span> contact@gmail.com
          </div>
          <div className="footer-center">
            Trusted by 100+ schools and colleges
          </div>
          <div className="footer-right">
            <FaFacebook className="social-icon" />
            <FaInstagram className="social-icon" />
            <FaYoutube className="social-icon" />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Frontpage;
