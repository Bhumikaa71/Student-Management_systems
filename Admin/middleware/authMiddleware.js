const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get admin from token (using adminId)
      req.admin = await Admin.findById(decoded.adminId).select('-password');

      if (!req.admin) {
        return res.status(401).json({ 
          success: false,
          message: 'Not authorized, admin not found' 
        });
      }

      next();
    } catch (error) {
      console.error('Error in auth middleware:', error);
      res.status(401).json({ 
        success: false,
        message: 'Not authorized',
        error: error.message 
      });
    }
  }

  if (!token) {
    res.status(401).json({ 
      success: false,
      message: 'Not authorized, no token provided' 
    });
  }
};

module.exports = { protect };