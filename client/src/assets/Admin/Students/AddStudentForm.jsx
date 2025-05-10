// AddStudentForm.jsx
import React, { useState } from 'react';

const AddStudentForm = ({ onAddStudent, onClose }) => {
  const [formData, setFormData] = useState({
    rollNumber: '',
    name: '',
    grade: '',
    phone: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation (optional)
    if (!formData.name || !formData.rollNumber || !formData.grade) {
      alert('Please fill in Roll Number, Name, and Grade.');
      return;
    }
    onAddStudent(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content add-student-form-modal"> {/* Use a more specific class if needed */}
        <h2>Add New Student</h2>
        <form onSubmit={handleSubmit} className="student-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="rollNumber">Roll Number</label>
              <input type="text" id="rollNumber" name="rollNumber" value={formData.rollNumber} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="grade">Grade</label>
              <input type="text" id="grade" name="grade" value={formData.grade} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
        
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="submit-btn">Add Student</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentForm;