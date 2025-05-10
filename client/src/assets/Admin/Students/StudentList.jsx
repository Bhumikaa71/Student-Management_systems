import React, { useState, useEffect } from 'react';
import { Search, UserPlus, File, Edit, Trash2, ChevronDown, ChevronUp, Menu } from 'lucide-react';
import './StudentList.css';
import Sidebar from "../Sidebar";
import AddStudentForm from "./AddStudentForm";

const initialStudents = [
  {
    id: '1',
    rollNumber: '101',
    name: 'John Doe',
    grade: '10',
    phone: '1234567890',
    email: 'john@example.com',
    password: 'password123'
  },
  {
    id: '2',
    rollNumber: '102',
    name: 'Jane Smith',
    grade: '11',
    phone: '9876543210',
    email: 'jane@example.com',
    password: 'password123'
  }
];

const StudentList = () => {
  const [students, setStudents] = useState(initialStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (!isMobile) {
        setShowMobileMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  const handleAddStudent = (newStudent) => {
    setStudents([...students, { ...newStudent, id: Date.now().toString() }]);
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedStudents = [...students].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  const filteredStudents = sortedStudents.filter(student =>
    Object.values(student).some(
      value => value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const SortIcon = ({ column }) => (
    <span className="sort-icon">
      {sortConfig.key === column && sortConfig.direction === 'asc' ? (
        <ChevronUp size={16} />
      ) : (
        <ChevronDown size={16} />
      )}
    </span>
  );

  return (
    <div className="admin-layout">
      <Sidebar 
        showMobileMenu={showMobileMenu} 
        isMobile={isMobile} 
        toggleMobileMenu={toggleMobileMenu} 
      />
      
      <div className={`main-content ${showMobileMenu ? 'menu-open' : ''}`}>
        <div className="mobile-header">
          <button className="menu-toggle" onClick={toggleMobileMenu}>
            <Menu size={24} />
          </button>
          <h2>Students List</h2>
        </div>
        
        <div className="student-list-container">
          <div className="header-section">
            {!isMobile && <h2>Students List</h2>}
            <div className="controls-section">
              <div className="search-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="add-btn" onClick={() => setIsModalOpen(true)}>
                <UserPlus size={16} /> Add Student
              </button>
            </div>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSort('rollNumber')}>
                    Roll No {sortConfig.key === 'rollNumber' && <SortIcon column="rollNumber" />}
                  </th>
                  <th onClick={() => handleSort('name')}>
                    Name {sortConfig.key === 'name' && <SortIcon column="name" />}
                  </th>
                  <th onClick={() => handleSort('grade')}>
                    Grade {sortConfig.key === 'grade' && <SortIcon column="grade" />}
                  </th>
                  <th onClick={() => handleSort('phone')}>
                    Phone {sortConfig.key === 'phone' && <SortIcon column="phone" />}
                  </th>
                  <th onClick={() => handleSort('email')}>
                    Email {sortConfig.key === 'email' && <SortIcon column="email" />}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>{student.rollNumber}</td>
                      <td>{student.name}</td>
                      <td>{student.grade}</td>
                      <td>{student.phone}</td>
                      <td>{student.email}</td>
                      <td className="actions-cell">
                        <button className="action-btn view-btn" title="View Details">
                          <File size={16} />
                        </button>
                        <button className="action-btn edit-btn" title="Edit">
                          <Edit size={16} />
                        </button>
                        <button
                          className="action-btn delete-btn"
                          title="Delete"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="no-results">
                    <td colSpan="6">No students found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {isModalOpen && (
            <AddStudentForm
              onAddStudent={handleAddStudent}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentList;