import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { 
  FaBell, 
  FaChevronDown, 
  FaBars,
  FaCalendarAlt,
  FaUserGraduate,
  FaUserCheck,
  FaUserTimes
} from "react-icons/fa";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid,
  ResponsiveContainer 
} from "recharts";
import Sidebar from "./Sidebar";
import "./Dashboard.css";

const data = [
  { name: "Week 1", Present: 20, Absent: 4 },
  { name: "Week 2", Present: 13, Absent: 11 },
  { name: "Week 3", Present: 22, Absent: 2 },
  { name: "Week 4", Present: 15, Absent: 9 },
];

const holidays = [
  new Date(2023, 4, 1),
  new Date(2023, 4, 29),
  new Date(2023, 5, 14),
  new Date(2023, 7, 15),
];

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [loggedInUserName, setLoggedInUserName] = useState("User");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowMobileMenu(false);
      }
    };

    setTimeout(() => {
      setLoggedInUserName(" ");
    }, 500);

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showUserMenu) setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    if (showNotifications) setShowNotifications(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isHoliday = (date) => {
    return holidays.some(holiday =>
      holiday.getDate() === date.getDate() &&
      holiday.getMonth() === date.getMonth() &&
      holiday.getFullYear() === date.getFullYear()
    );
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month' && isHoliday(date)) {
      return <div className="holiday-date">{date.getDate()}</div>;
    }
    return null;
  };

  return (
    <div className="dashboard-wrapper">
      {isMobile && (
        <div className="mobile-menu-button" onClick={toggleMobileMenu}>
          <FaBars />
        </div>
      )}

      <Sidebar 
        showMobileMenu={showMobileMenu} 
        isMobile={isMobile} 
        toggleMobileMenu={toggleMobileMenu} 
      />

      <div className={`main-content ${!isMobile ? 'desktop-view' : ''}`}>
        <div className="dashboard-header">
          <h2 className="welcome-message">Welcome Back!</h2>
          <div className="right-header">
            <div className="calendar-container">
              <div className="custom-calendar-display" onClick={toggleCalendar}>
                <FaCalendarAlt className="calendar-icon" />
                <span className="calendar-text">
                  {`${selectedDate.toLocaleDateString("en-US", { month: 'long', year: 'numeric' })} ${selectedDate.getDate()}th`}
                </span>
                <FaChevronDown className="calendar-chevron" />
              </div>
              {showCalendar && (
                <div className="calendar-dropdown">
                  <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    tileContent={tileContent}
                    tileClassName={({ date, view }) => {
                      if (view === 'month' && isHoliday(date)) {
                        return 'holiday';
                      }
                    }}
                  />
                </div>
              )}
            </div>
            <div className="bell-wrapper" onClick={toggleNotifications}>
              <FaBell />
              <span className="notification-dot"></span>
              {showNotifications && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <h4>Notifications</h4>
                    <span className="notification-count">2</span>
                  </div>
                  <div className="notification-item">
                    <p className="notification-title">Tomorrow Holiday</p>
                    <small className="notification-text">
                      Due to birthday of Bhumika Bista tomorrow we announced the holiday
                    </small>
                  </div>
                  <div className="notification-item">
                    <p className="notification-title">Parent Meeting</p>
                    <small className="notification-text">
                      Scheduled for Friday at 10:00 AM
                    </small>
                  </div>
                </div>
              )}
            </div>
            <div className="avatar-wrapper" onClick={toggleUserMenu}>
              <div className="avatar">
                {loggedInUserName.charAt(0).toUpperCase()}
              </div>
              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <div className="user-avatar">{loggedInUserName.charAt(0).toUpperCase()}</div>
                    <div>
                      <p className="user-name">{loggedInUserName}</p>
                      <p className="user-role">Admin</p>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <a href="#" className="dropdown-item">Profile</a>
                  <a href="#" className="dropdown-item">Settings</a>
                  <div className="dropdown-divider"></div>
                  <a href="#" className="dropdown-item">Logout</a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="metrics-container">
          <div className="metric-box">
            <div className="metric-icon">
              <FaUserGraduate />
            </div>
            <p>Total Student</p>
            <h3>24</h3>
          </div>
          <div className="metric-box">
            <div className="metric-icon present">
              <FaUserCheck />
            </div>
            <p>Total Present</p>
            <h3>50%</h3>
          </div>
          <div className="metric-box">
            <div className="metric-icon absent">
              <FaUserTimes />
            </div>
            <p>Total Absent</p>
            <h3>50%</h3>
          </div>
        </div>

        <div className="content-grid">
          <div className="chart-box">
            <h3>Attendance</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 'dataMax * 1.2']} />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="Present" 
                    fill="#5e4b8b" 
                    barSize={30} 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="Absent" 
                    fill="#819dbf" 
                    barSize={30} 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="right-column">
            <div className="info-box time-info-box">
              <div className="time-content">
                <span className="time-icon">☀️</span>
                <div>
                  <p className="current-time">{formatTime(currentTime)}</p>
                  <p className="realtime-insight">Realtime Insight</p>
                </div>
              </div>
              <p className="today-date">
                Today: {new Date().toLocaleDateString("en-US", { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>

            <div className="info-box notification-box">
              <p className="notification-title"><strong>Notification</strong></p>
              <p className="notification-item">1. Tomorrow Holiday</p>
              <small className="notification-text">
                Dear students, due to birthday of Bhumika Bista tomorrow we announced the holiday
              </small>
              <a href="#" className="read-more-link">Read more</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;