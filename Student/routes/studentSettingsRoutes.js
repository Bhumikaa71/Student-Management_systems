// server/Student/controllers/studentSettingsController.js
exports.changeStudentPassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: 'Please provide current and new passwords' });
    }

    try {
        const student = await Student.findById(req.user._id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Check current password
        const isMatch = await bcrypt.compare(currentPassword, student.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid current password' });
        }

        // Hash new password and save
        student.password = await bcrypt.hash(newPassword, 10); // <--- This line is redundant and problematic
        await student.save(); // <--- This save triggers the pre('save') hook again

        res.json({ success: true, message: 'Password changed successfully' });

    } catch (error) {
        console.error('Error changing student password:', error);
        res.status(500).json({ message: 'Server error while changing password' });
    }
};