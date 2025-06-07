// server/Student/controllers/studentSettingsController.js
const Student = require('../models/studentModel');
const bcrypt = require('bcrypt');

// ... (getStudentProfile and updateStudentProfile functions remain the same) ...

// @desc    Change student password
// @route   PUT /api/students/change-password
// @access  Private (Student)
exports.changeStudentPassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    // 1. Basic input validation
    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: 'Please provide current and new passwords' });
    }

    try {
        const student = await Student.findById(req.user._id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // 2. Check current password
        const isMatch = await bcrypt.compare(currentPassword, student.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid current password' });
        }

        // 3. New Password Validation (Crucial addition based on your initial error)
        const validationErrors = [];
        if (newPassword.length < 8) { // Assuming 8 characters from your previous error
            validationErrors.push('Passwords must have at least 8 characters.');
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) { // Check for non-alphanumeric
            validationErrors.push('Passwords must have at least one non alphanumeric character.');
        }
        if (!/\d/.test(newPassword)) { // Check for at least one digit
            validationErrors.push('Passwords must have at least one digit (\'0\'-\'9\').');
        }
        if (!/[A-Z]/.test(newPassword)) { // Check for at least one uppercase
            validationErrors.push('Passwords must have at least one uppercase (\'A\'-\'Z\').');
        }

        if (validationErrors.length > 0) {
            // Return 400 Bad Request with specific validation errors
            return res.status(400).json({
                success: false,
                message: 'Password validation failed',
                errors: { password: validationErrors } // Match the previous error structure
            });
        }

        // 4. Update password (relying on pre('save') hook for hashing)
        student.password = newPassword; // Assign plain new password, the pre('save') hook will hash it
        await student.save(); // This will trigger the pre('save') hook to hash the new password

        res.json({ success: true, message: 'Password changed successfully' });

    } catch (error) {
        console.error('Error changing student password:', error);
        // More descriptive error handling for server-side issues
        if (error.name === 'ValidationError') { // Mongoose validation error
            return res.status(400).json({ success: false, message: error.message, errors: error.errors });
        }
        res.status(500).json({ success: false, message: 'Server error while changing password. Please check server logs for details.' });
    }
};

// ... (updateStudentProfile function remains the same) ...