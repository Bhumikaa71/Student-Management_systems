// server/server.js - Full Code with Integrated Student Settings Logic

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables
const { celebrate, Joi, errors } = require('celebrate'); // For validation

// --- Import Models (Needed for Controllers and Middleware) ---
const Admin = require('./Admin/models/adminModel'); // For admin auth middleware
const Student = require('./Student/models/studentModel'); // For student auth middleware and other student operations

// --- Import Existing Admin/Teacher Routes (If you want to keep them separate) ---
const adminRoutes = require('./Admin/routes/adminRoutes');
const teacherRoutes = require('./Admin/routes/teacherRoutes');
const noticeRoutes = require('./Admin/routes/noticeRoutes');
const routineRoutes = require('./Admin/routes/routineRoutes');
const settingRoutes = require('./Admin/routes/settingRoutes'); // Admin profile settings

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middlewares ---
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
    console.error('Could not connect to MongoDB:', err);
    process.exit(1); // Exit process with failure
});

// --- Authentication Middlewares (Integrated) ---

// 1. Admin Protect Middleware (Your existing one, but integrated)
const protectAdmin = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Assumes admin token has 'adminId'
            req.admin = await Admin.findById(decoded.adminId).select('-password');
            if (!req.admin) {
                return res.status(401).json({ success: false, message: 'Not authorized, admin not found' });
            }
            next();
        } catch (error) {
            console.error('Error in admin auth middleware:', error);
            res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    }
    if (!token) {
        res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
    }
};

// 2. Student Protect Middleware (Integrated and Corrected)
const protectStudent = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // IMPORTANT: Assumes student token has 'studentId'
            req.user = await Student.findById(decoded.studentId).select('-password'); // Set req.user to the student document
            if (!req.user) {
                return res.status(401).json({ success: false, message: 'Not authorized, student not found (invalid ID in token)' });
            }
            next();
        } catch (error) {
            console.error('Error in student auth middleware:', error);
            res.status(401).json({ success: false, message: 'Not authorized, token failed or invalid' });
        }
    } else {
        res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
    }
};


// --- Controller Logic (Integrated for Student Settings) ---

// Get student profile
const getStudentProfile = async (req, res) => {
    try {
        // req.user is set by the protectStudent middleware
        const student = await Student.findById(req.user._id).select('-password');

        if (student) {
            res.json({
                success: true,
                name: student.name,
                email: student.email,
                rollNumber: student.rollNumber,
                grade: student.grade,
                phone: student.phone
            });
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        console.error('Error fetching student profile:', error);
        res.status(500).json({ message: 'Server error while fetching student profile' });
    }
};

// Change student password
const changeStudentPassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: 'Please provide current and new passwords' });
    }

    try {
        const student = await Student.findById(req.user._id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, student.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid current password' });
        }

        student.password = await bcrypt.hash(newPassword, 10);
        await student.save();

        res.json({ success: true, message: 'Password changed successfully' });

    } catch (error) {
        console.error('Error changing student password:', error);
        res.status(500).json({ message: 'Server error while changing password' });
    }
};

// --- API Endpoints ---

// Existing Admin/Teacher Routes (Mounted as they were)
app.use('/api/admin', adminRoutes);
app.use('/api/admin', settingRoutes);
app.use('/api', teacherRoutes);
app.use('/api/admin/notices', noticeRoutes);
app.use('/api/admin/routines', routineRoutes);

// Student Management Routes (Your existing ones from server.js)
// Add New Student
app.post('/api/students', celebrate({
    body: Joi.object({
        rollNumber: Joi.string().required().messages({
            'string.empty': 'Roll Number is required',
            'any.required': 'Roll Number is required'
        }),
        name: Joi.string().required().messages({
            'string.empty': 'Name is required',
            'any.required': 'Name is required'
        }),
        grade: Joi.string().required().messages({
            'string.empty': 'Grade is required',
            'any.required': 'Grade is required'
        }),
        phone: Joi.string().allow('').optional().pattern(/^\d{10}$/).messages({
            'string.pattern.base': 'Phone must be 10 digits'
        }),
        email: Joi.string().required().email().messages({
            'string.empty': 'Email is required',
            'string.email': 'Please enter a valid email address',
            'any.required': 'Email is required'
        }),
        password: Joi.string().required().min(6).messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 6 characters',
            'any.required': 'Password is required'
        })
    })
}), async (req, res) => {
    try {
        const { password, ...studentData } = req.body;
        console.log('Backend: Received data:', studentData);

        const existingStudent = await Student.findOne({
            $or: [
                { rollNumber: studentData.rollNumber },
                { email: studentData.email }
            ]
        });

        if (existingStudent) {
            const conflictField = existingStudent.rollNumber === studentData.rollNumber
                ? 'Roll Number'
                : 'Email';
            return res.status(409).json({
                success: false,
                error: `${conflictField} already exists`,
                field: conflictField.toLowerCase().replace(' ', '')
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = new Student({
            ...studentData,
            password: hashedPassword
        });

        const savedStudent = await newStudent.save();

        res.status(201).json({
            success: true,
            data: savedStudent,
            message: 'Student created successfully'
        });

    } catch (error) {
        console.error('Backend: Error adding student:', error);
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ success: false, error: 'Validation failed', details: errors });
        }
        res.status(500).json({ success: false, error: 'Internal server error', message: 'Failed to add student' });
    }
});

// Get All Students
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find().select('-password');
        res.json({ success: true, count: students.length, data: students });
    } catch (error) {
        console.error('Error getting students:', error);
        res.status(500).json({ success: false, error: 'Internal server error', message: 'Failed to retrieve students' });
    }
});

// Student Login
app.post('/api/students/login', async (req, res) => {
    try {
        const { rollNumber, password } = req.body;
        if (!rollNumber || !password) {
            return res.status(400).json({ success: false, error: 'Validation error', message: 'Roll Number and password are required' });
        }
        const student = await Student.findOne({ rollNumber });
        if (!student) {
            return res.status(401).json({ success: false, error: 'Authentication failed', message: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, student.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, error: 'Authentication failed', message: 'Invalid credentials' });
        }
        const token = jwt.sign(
            {
                studentId: student._id, // This is crucial for the protectStudent middleware
                rollNumber: student.rollNumber
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1h' }
        );
        res.json({
            success: true,
            token,
            data: {
                rollNumber: student.rollNumber,
                name: student.name,
                email: student.email,
                grade: student.grade,
                phone: student.phone
            },
            message: 'Login successful'
        });
    } catch (error) {
        console.error('Student login error:', error);
        res.status(500).json({ success: false, error: 'Internal server error', message: 'Failed to process login' });
    }
});

// --- Student Settings Routes (Integrated) ---
// These routes will now use the protectStudent middleware and the integrated controller functions
app.get('/api/students/profile', protectStudent, getStudentProfile);
app.put('/api/students/change-password', protectStudent, changeStudentPassword);


// --- Error Handling Middleware (Keep at the end) ---
app.use(errors()); // Joi/Celebrate error handler

app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: 'Something went wrong!'
    });
});

// 404 Handler (Catch-all for undefined routes)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Not found',
        message: 'The requested resource was not found'
    });
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});