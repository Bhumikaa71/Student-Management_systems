const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers'); // Corrected case

router.post('/signup', adminController.signupAdmin);
router.post('/login', adminController.loginAdmin);

module.exports = router;