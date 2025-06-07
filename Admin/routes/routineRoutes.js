const express = require('express');
const router = express.Router();
const routineController = require('../controllers/routineController');

router.get('/', routineController.getAllRoutines);
router.post('/', routineController.createRoutine);
router.delete('/:id', routineController.deleteRoutine);
router.put('/:id', routineController.updateRoutine);

module.exports = router;