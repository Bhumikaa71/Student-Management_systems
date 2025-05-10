import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUserGraduate,
  FaUsers,
  FaClipboardCheck,
  FaCode,
  FaBell,
  FaCalendarAlt,
  FaCog,
  FaSignOutAlt,
  FaUser
} from "react-icons/fa";
import "./Sidebar.css";

const menuItems = [
  { name: "Dashboard", icon: <FaUserGraduate />, path: "/admin/dashboard" },
  { name: "Students", icon: <FaUsers />, path: "/admin/students/studentlist" }, // Changed path here
  { name: "Teacher", icon: <FaUsers />, path: "/admin/teacher" },
  { name: "Attendance", icon: <FaClipboardCheck />, path: "/admin/attendance" },
  { name: "Scan", icon: <FaCode />, path: "/admin/scan" },
  { name: "Notice", icon: <FaBell />, path: "/admin/notice" },
  { name: "Routine", icon: <FaCalendarAlt />, path: "/admin/routine" },
  { name: "Profile", icon: <FaUser />, path: "/admin/profile" },
  { name: "Setting", icon: <FaCog />, path: "/admin/setting" },
];

const Sidebar = ({ showMobileMenu, isMobile, toggleMobileMenu }) => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/admin/login";
  };

  return (
    <div
      className={`sidebar ${isMobile ? 'mobile-sidebar' : ''} ${showMobileMenu ? 'show' : ''}`}
      onClick={isMobile ? toggleMobileMenu : undefined}
    >
      <div className="logo">
        <FaUserGraduate className="logo-icon" />
        SRS
      </div>

      <nav className="nav-links">
        {menuItems.map(({ name, icon, path }) => (
          <Link to={path} key={name} className="nav-link">
            <div className={`nav-item ${location.pathname === path ? 'active' : ''}`}>
              <span className="nav-icon">{icon}</span>
              <span>{name}</span>
            </div>
          </Link>
        ))}
      </nav>

      <div className="logout" onClick={handleLogout}>
        <FaSignOutAlt className="logout-icon" />
        Log Out
      </div>
    </div>
  );
};

export default Sidebar;