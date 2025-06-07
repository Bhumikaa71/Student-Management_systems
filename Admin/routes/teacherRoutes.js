//  teacherRoutes.js (Express Routes)
const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'yourSecretKey';  // IMPORTANT: Use .env for secretKey

// GET all teachers
router.get('/teachers', async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (err) {
        console.error('Error fetching teachers:', err);
        res.status(500).json({ message: 'Failed to fetch teachers' });
    }
});

// POST a new teacher
router.post('/teachers', async (req, res) => {
    const { name, subject, grade, email, password } = req.body;

    if (!password) { // Check if password was provided
        return res.status(400).json({ message: 'Password is required' });
    }

    try {
        // Check if the email is already taken.
        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) {
            return res.status(400).json({ message: 'Email is already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newTeacher = new Teacher({ name, subject, grade, email, password: hashedPassword });

        const savedTeacher = await newTeacher.save();
        res.status(201).json(savedTeacher);
    } catch (err) {
        console.error('Error adding teacher:', err);
        res.status(500).json({ message: 'Failed to add teacher', error: err });
    }
});

// GET a specific teacher by ID
router.get('/teachers/:id', async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.json(teacher);
    } catch (err) {
        console.error('Error fetching teacher:', err);
        res.status(500).json({ message: 'Failed to fetch teacher' });
    }
});

// PUT (update) a specific teacher by ID
router.put('/teachers/:id', async (req, res) => {
    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTeacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.json(updatedTeacher);
    } catch (err) {
        console.error('Error updating teacher:', err);
        res.status(500).json({ message: 'Failed to update teacher' });
    }
});

// DELETE a specific teacher by ID
router.delete('/teachers/:id', async (req, res) => {
    try {
        const teacherToDelete = await Teacher.findByIdAndDelete(req.params.id);
        if (!teacherToDelete) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.json({ message: 'Teacher deleted successfully' });
    } catch (err) {
        console.error('Error deleting teacher:', err);
        res.status(500).json({ message: 'Failed to delete teacher' });
    }
});

// POST - Teacher Login
router.post('/teachers/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Find the teacher by email
        const teacher = await Teacher.findOne({ email });
        if (!teacher) {
            console.log(`Login failed: Teacher with email ${email} not found.`);
            return res.status(401).json({ message: 'Invalid credentials. Email not found.' });
        }

        // 2. Check the password
        const passwordMatch = await bcrypt.compare(password, teacher.password);
        if (!passwordMatch) {
            console.log(`Login failed: Incorrect password for email ${email}.`);
            return res.status(401).json({ message: 'Invalid credentials. Password incorrect.' });
        }

        // 4. Generate JWT token
        const token = jwt.sign({
            email: teacher.email,
            name: teacher.name,
        }, secretKey, { expiresIn: '1h' });

        console.log(`Login successful for teacher: ${teacher.email}`);
        res.json({
            message: 'Login successful!',
            token: token,
            email: teacher.email,
            name: teacher.name,
        });
    } catch (err) {
        // 5. Detailed error logging
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Login failed', error: err.message || 'Internal server error' });
    }
});

module.exports = router;
