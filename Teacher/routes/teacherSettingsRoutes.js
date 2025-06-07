// server/Teacher/routes/teacherSettingsRoutes.js
const express = require('express');
const router = express.Router();
const teacherSettingsController = require('../controllers/teacherSettingsController');
const { protectTeacher } = require('../../Admin/middleware/authMiddleware'); // Adjust path to your auth middleware

router.get('/profile', protectTeacher, teacherSettingsController.getTeacherProfile);
router.put('/change-password', protectTeacher, teacherSettingsController.changeTeacherPassword);
// If you enable profile update, uncomment the line below:
// router.put('/profile', protectTeacher, teacherSettingsController.updateTeacherProfile);

module.exports = router;