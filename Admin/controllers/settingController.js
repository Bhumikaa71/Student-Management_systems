const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');

exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    if (!admin) {
      return res.status(404).json({ 
        success: false,
        message: 'Admin not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      fullName: admin.username,
      email: admin.collegeEmail
    });
  } catch (error) {
    console.error('Error fetching admin profile:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server Error',
      error: error.message 
    });
  }
};

exports.changeAdminPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide both current and new passwords.' 
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: 'New password must be at least 6 characters long.' 
      });
    }

    // Find admin
    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      return res.status(404).json({ 
        success: false,
        message: 'Admin not found.' 
      });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid current password.' 
      });
    }

    // Hash and save new password
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);
    await admin.save();

    res.status(200).json({ 
      success: true,
      message: 'Password changed successfully!' 
    });

  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server Error',
      error: error.message 
    });
  }
};

exports.updateAdminProfile = async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      return res.status(404).json({ 
        success: false,
        message: 'Admin not found.' 
      });
    }

    // Update fields if provided
    if (fullName) admin.username = fullName;
    if (email) admin.collegeEmail = email;

    await admin.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      fullName: admin.username,
      email: admin.collegeEmail
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server Error',
      error: error.message 
    });
  }
};