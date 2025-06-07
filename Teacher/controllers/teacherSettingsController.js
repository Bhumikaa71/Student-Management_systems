// server/Teacher/controllers/teacherSettingsController.js
const Teacher = require('../models/teacherModel'); // Adjust path if necessary
const bcrypt = require('bcrypt');

// @desc    Get teacher profile
// @route   GET /api/teachers/profile
// @access  Private (Teacher)
exports.getTeacherProfile = async (req, res) => {
    try {
        // req.user is set by the protectTeacher middleware
        const teacher = await Teacher.findById(req.user._id).select('-password');

        if (teacher) {
            res.json({
                success: true,
                fullName: teacher.fullName, // Assuming 'fullName' is the field for teachers
                email: teacher.email
            });
        } else {
            res.status(404).json({ message: 'Teacher not found' });
        }
    } catch (error) {
        console.error('Error fetching teacher profile:', error);
        res.status(500).json({ message: 'Server error while fetching teacher profile' });
    }
};

// @desc    Change teacher password
// @route   PUT /api/teachers/change-password
// @access  Private (Teacher)
exports.changeTeacherPassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: 'Please provide current and new passwords' });
    }

    try {
        const teacher = await Teacher.findById(req.user._id);

        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        // Check current password
        const isMatch = await bcrypt.compare(currentPassword, teacher.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid current password' });
        }

        // Hash new password and save
        teacher.password = await bcrypt.hash(newPassword, 10);
        await teacher.save();

        res.json({ success: true, message: 'Password changed successfully' });

    } catch (error) {
        console.error('Error changing teacher password:', error);
        res.status(500).json({ message: 'Server error while changing password' });
    }
};

// (Optional) @desc    Update teacher profile (if you enable name/email update on frontend)
// @route   PUT /api/teachers/profile
// @access  Private (Teacher)
exports.updateTeacherProfile = async (req, res) => {
    const { fullName, email } = req.body; // Add other fields if allowed to update

    try {
        const teacher = await Teacher.findById(req.user._id);

        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        // Update fields if provided
        if (fullName) teacher.fullName = fullName;
        if (email) teacher.email = email; // Add validation if unique email is required

        await teacher.save();

        res.json({ success: true, message: 'Teacher profile updated successfully', data: teacher.toObject({ getters: true, virtuals: false }) });

    } catch (error) {
        console.error('Error updating teacher profile:', error);
        if (error.code === 11000) { // Duplicate key error for unique fields
            return res.status(400).json({ message: 'Email already exists.' });
        }
        res.status(500).json({ message: 'Server error while updating teacher profile' });
    }
};