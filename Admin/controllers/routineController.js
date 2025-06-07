const Routine = require('../models/RoutineModel');

exports.getAllRoutines = async (req, res) => {
    try {
        const routines = await Routine.find();
        res.json(routines);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createRoutine = async (req, res) => {
    const routine = new Routine({
        day: req.body.day,
        time: req.body.time,
        grade: req.body.grade,
        subject: req.body.subject,
        teacher: req.body.teacher,
        room: req.body.room,
    });

    try {
        const newRoutine = await routine.save();
        res.status(201).json(newRoutine);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteRoutine = async (req, res) => {
    try {
        const routine = await Routine.findByIdAndDelete(req.params.id);
        if (!routine) {
            return res.status(404).json({ message: 'Cannot find routine entry' });
        }
        res.json({ message: 'Deleted routine entry' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateRoutine = async (req, res) => {
    try {
        const routine = await Routine.findById(req.params.id);
        if (!routine) {
            return res.status(404).json({ message: 'Cannot find routine entry' });
        }

        routine.day = req.body.day || routine.day;
        routine.time = req.body.time || routine.time;
        routine.grade = req.body.grade || routine.grade;
        routine.subject = req.body.subject || routine.subject;
        routine.teacher = req.body.teacher || routine.teacher;
        routine.room = req.body.room || routine.room;

        const updatedRoutine = await routine.save();
        res.json(updatedRoutine);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};