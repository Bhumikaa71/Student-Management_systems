import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaUniversity, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import image from "../Image/Login.png"; // Update path if needed

const Adminsignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    collegeName: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    setAnimate(true);
  }, []);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Signup successful!");
        window.location.href = "/admin/login";
      } else {
        setMessage(data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("An error occurred. Try again.");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div
        style={{
          ...styles.container,
          transform: animate ? "translateY(0)" : "translateY(50px)",
          opacity: animate ? 1 : 0,
          transition: "all 0.8s ease-in-out",
        }}
      >
        {/* Left Panel */}
        <div style={styles.leftPanel}>
          <h2 style={styles.heading}>Create an Admin Account</h2>
          <img
            src={image}
            alt="Sign Up"
            style={styles.image}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>

        {/* Right Panel */}
        <div style={styles.rightPanel}>
          <h2 style={styles.title}>Admin Sign Up</h2>

          <div style={styles.inputGroup}>
            <FaUser style={styles.icon} />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <FaUniversity style={styles.icon} />
            <input
              type="text"
              name="collegeName"
              placeholder="College Name"
              value={formData.collegeName}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <MdEmail style={styles.icon} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <FaLock style={styles.icon} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
            <span onClick={togglePassword} style={styles.eyeIcon}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {message && <div style={styles.message}>{message}</div>}

          <button
            style={styles.button}
            onClick={handleSignUp}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#35548c";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#1e3c72";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Sign Up
          </button>

          <p style={styles.signupText}>
            Already have an account?{" "}
            <Link to="/admin/login" style={styles.signupLink}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #4c6698, #233567)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    maxWidth: "1400px",
    minHeight: "800px",
    borderRadius: "20px",
    background: "linear-gradient(to right, #ffffff, #1e3c72)",
    boxShadow: `
      0 12px 30px rgba(0, 0, 0, 0.4),
      0 20px 60px rgba(0, 0, 0, 0.3),
      inset 0 0 20px rgba(0, 0, 0, 0.1)
    `,
    overflow: "hidden",
  },
  leftPanel: {
    flex: "1 1 50%",
    padding: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: "30px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
  },
  image: {
    width: "100%",
    maxWidth: "550px",
    height: "auto",
    borderRadius: "12px",
    boxShadow: `
      0 8px 20px rgba(0, 0, 0, 0.4),
      inset 0 0 25px rgba(0, 0, 0, 0.9)
    `,
    transition: "transform 0.3s ease-in-out",
  },
  rightPanel: {
    flex: "1 1 50%",
    padding: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: "28px",
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: "30px",
  },
  inputGroup: {
    position: "relative",
    marginBottom: "20px",
  },
  icon: {
    position: "absolute",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#444",
  },
  input: {
    width: "100%",
    padding: "12px 12px 12px 40px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    backgroundColor: "#f0f0f0",
  },
  eyeIcon: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#555",
  },
  button: {
    padding: "12px 20px",
    fontSize: "18px",
    fontWeight: "bold",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#1e3c72",
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "10px",
  },
  signupText: {
    color: "#fff",
    marginTop: "20px",
    fontSize: "16px",
  },
  signupLink: {
    color: "#ffcc00",
    textDecoration: "underline",
    marginLeft: "5px",
  },
  message: {
    color: "#ffcccc",
    marginBottom: "10px",
    fontWeight: "bold",
  },
};

export default Adminsignup;
