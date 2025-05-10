import React from 'react';
import './LoginPage.css';
import { FaUser, FaGraduationCap, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="role-container">
      <div className="role-box" onClick={() => navigate('/admin/login')}>
        <FaUser className="role-icon" />
        <h2>Admin</h2>
        <p>Login as an administrator to access the dashboard to manage app data.</p>
      </div>
      <div className="role-box" onClick={() => navigate('/student/login')}>
        <FaGraduationCap className="role-icon" />
        <h2>Student</h2>
        <p>Login as a student to explore course materials and assignments.</p>
      </div>
      <div className="role-box" onClick={() => navigate('/teacher/login')}>
        <FaUsers className="role-icon" />
        <h2>Teacher</h2>
        <p>Login as a teacher to create courses, assignments, and track student progress.</p>
      </div>
    </div>
  );
};

export default LoginPage;