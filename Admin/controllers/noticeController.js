// server/Notice/controllers/noticeController.js
const Notice = require('../models/noticeModel'); // Path to your Notice model

// Implement these functions based on your requirements
exports.getAllNotices = async (req, res) => {
    try {
        const notices = await Notice.find({});
        res.status(200).json(notices);
    } catch (error) {
        console.error('Error getting all notices:', error);
        res.status(500).json({ message: 'Server error: Could not fetch notices.' });
    }
};

exports.createNotice = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required for a notice.' });
        }
        const newNotice = await Notice.create({ title, content });
        res.status(201).json(newNotice);
    } catch (error) {
        console.error('Error creating notice:', error);
        res.status(500).json({ message: 'Server error: Could not create notice.' });
    }
};

exports.getNotice = async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.id); // This is where "change-password" was failing
        if (!notice) {
            return res.status(404).json({ message: 'Notice not found.' });
        }
        res.status(200).json(notice);
    } catch (error) {
        console.error('Error getting notice by ID:', error);
        // This catch block will specifically catch the CastError
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Notice ID format.' });
        }
        res.status(500).json({ message: 'Server error: Could not fetch notice.' });
    }
};

exports.updateNotice = async (req, res) => {
    try {
        const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!notice) {
            return res.status(404).json({ message: 'Notice not found for update.' });
        }
        res.status(200).json(notice);
    } catch (error) {
        console.error('Error updating notice:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Notice ID format for update.' });
        }
        res.status(500).json({ message: 'Server error: Could not update notice.' });
    }
};

exports.deleteNotice = async (req, res) => {
    try {
        const notice = await Notice.findByIdAndDelete(req.params.id);
        if (!notice) {
            return res.status(404).json({ message: 'Notice not found for deletion.' });
        }
        res.status(200).json({ message: 'Notice deleted successfully.' });
    } catch (error) {
        console.error('Error deleting notice:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Notice ID format for deletion.' });
        }
        res.status(500).json({ message: 'Server error: Could not delete notice.' });
    }
};