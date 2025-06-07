const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    grade: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Email is required'],
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        },
        unique: true
    },
    password: { // ADDED password field
        type: String,
        required: true  // Password should be required for all teachers
    },
}, {
    timestamps: true
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;