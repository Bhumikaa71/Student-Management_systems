import React, { useState, useEffect } from "react";
import { FaLock, FaEyeSlash, FaEye } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import image from "../Image/Login.png"; // Update the path if necessary
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    setAnimate(true);
  }, []);

// In AdminLogin.jsx, modify the handleLogin function:
const handleLogin = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Login successful!");
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("adminData", JSON.stringify({
        name: data.name,
        email: data.email
      }));
      navigate("/admin/dashboard");
    } else {
      setMessage(data.message || "Login failed.");
    }
  } catch (error) {
    console.error("Login error:", error);
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
          <h1 style={styles.heading}>Login to Attendance Management System</h1>
          <img
            src={image}
            alt="Login Illustration"
            style={styles.image}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>

        {/* Right Panel */}
        <div style={styles.rightPanel}>
          <h2 style={styles.title}>Admin Login</h2>

          <div style={styles.inputGroup}>
            <MdEmail style={styles.icon} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#1e3c72")}
              onBlur={(e) => (e.target.style.borderColor = "#89bdd3")}
            />
          </div>

          <div style={styles.inputGroup}>
            <FaLock style={styles.icon} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#1e3c72")}
              onBlur={(e) => (e.target.style.borderColor = "#89bdd3")}
            />
            <span onClick={togglePassword} style={styles.eyeIcon}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {message && <div style={{ color: "#ffcccc", marginBottom: 10 }}>{message}</div>}

          <button
            style={styles.button}
            onClick={handleLogin}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#35548c";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#1e3c72";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Login
          </button>

          <p style={styles.signupText}>
            Don&apos;t have an account?{" "}
            <a href="/admin/signup" style={styles.signupLink}>Sign up</a>
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
    backgroundColor: "transparent",
    padding: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: "20px",
    borderBottomLeftRadius: "20px",
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
    borderTopRightRadius: "20px",
    borderBottomRightRadius: "20px",
    backgroundColor: "transparent",
    boxShadow: "inset 0 0 15px rgba(0,0,0,0.1)",
    color: "#fff",
  },
  title: {
    fontSize: "28px",
    marginBottom: "30px",
    color: "#fff",
    textAlign: "center",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
  },
  inputGroup: {
    position: "relative",
    marginBottom: "20px",
  },
  icon: {
    position: "absolute",
    top: "12px",
    left: "10px",
    color: "#fff",
  },
  input: {
    width: "100%",
    padding: "12px 10px 12px 35px",
    borderRadius: "6px",
    border: "1px solid #89bdd3",
    fontSize: "16px",
    backgroundColor: "#e0e0e0",
    color: "#333",
    fontWeight: "bold",
    boxShadow: "inset 0 0 8px rgba(0,0,0,0.1)",
    transition: "border-color 0.3s ease",
  },
  eyeIcon: {
    position: "absolute",
    top: "12px",
    right: "10px",
    cursor: "pointer",
    color: "#fff",
  },
  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#1e3c72",
    color: "#fff",
    border: "1px solid #89bdd3",
    borderRadius: "6px",
    fontWeight: "bold",
    fontSize: "17px",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    transition: "all 0.3s ease",
  },
  signupText: {
    marginTop: "20px",
    textAlign: "center",
    color: "#fff",
    fontSize: "14px",
  },
  signupLink: {
    color: "#ffdd57",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

export default AdminLogin;