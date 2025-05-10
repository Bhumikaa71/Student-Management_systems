import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Frontpage from "./assets/Frontpage";
import LoginPage from "./assets/LoginPage";
import AdminLogin from "./assets/Admin/AdminLogin";
import Adminsignup from "./assets/Admin/Adminsignup";
import Dashboard from "./assets/Admin/Dashboard";
import Sidebar from "./assets/Admin/Sidebar";
import Profile from "./assets/Admin/Profile";
import Setting from "./assets/Admin/Setting";
import StudentList from "./assets/Admin/Students/StudentList"; 
// import AddStudentForm from "./assets/Admin/Students/AddStudentForm"; 


// import StudentList from "./assets/Admin/Student/StudentList";

// import AddStudentForm from "./assets/Admin/Student/AddStudentForm";




// Import StudentLogin and TeacherLogin components (assuming you'll create them)
// import StudentLogin from "./assets/Student/StudentLogin";
// import TeacherLogin from "./assets/Teacher/TeacherLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<Adminsignup />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/sidebar" element={<Sidebar />} />
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/admin/setting" element={<Setting />} />
        <Route path="/admin/students/studentlist" element={<StudentList />} /> 
        {/* <Route path="/admin/students/AddstudentForm" element={<AddStudentForm />} />  */}


        {/* <Route path="/admin/student/StudentList" element={<StudentList />} /> */}

        {/* <Route path="/admin/Student/AddStudentForm" element={<AddStudentForm />} /> */}





        {/* Define routes for student and teacher login */}
        {/* <Route path="/student/login" element={<StudentLogin />} /> */}
        {/* <Route path="/teacher/login" element={<TeacherLogin />} /> */}
      </Routes>
    </Router>
  );
}

export default App;