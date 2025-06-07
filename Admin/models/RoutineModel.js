const mongoose = require('mongoose');

const routineSchema = new mongoose.Schema({
    day: { type: String, required: true },
    time: { type: String, required: true },
    grade: { type: String, required: true },
    subject: { type: String, required: true },
    teacher: { type: String, required: true },
    room: { type: String },
});

module.exports = mongoose.model('Routine', routineSchema);