// server/Notice/routes/noticeRoutes.js
const express = require('express');
const noticeController = require('../controllers/noticeController');
const router = express.Router();

// Route for /api/notices (or /api/notices/notice depending on server.js mount point)
router.route('/') // This refers to the base path where this router is mounted (e.g., /api/notices)
  .get(noticeController.getAllNotices)
  .post(noticeController.createNotice);

// Route for /api/notices/:id (for specific notice operations)
router
  .route('/:id')
  .get(noticeController.getNotice)
  .patch(noticeController.updateNotice)
  .delete(noticeController.deleteNotice);

module.exports = router;