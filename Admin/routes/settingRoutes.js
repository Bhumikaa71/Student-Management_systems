const express = require('express');
const router = express.Router();
const { 
  getAdminProfile, 
  changeAdminPassword, 
  updateAdminProfile 
} = require('../controllers/settingController');
const { protect } = require('../middleware/authMiddleware');

// Protected routes
router.get('/profile', protect, getAdminProfile);
router.put('/change-password', protect, changeAdminPassword);
router.put('/profile', protect, updateAdminProfile);

module.exports = router;