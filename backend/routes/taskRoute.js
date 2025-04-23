const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');

router.post('/', taskController.addTask );
router.get('/', taskController.getTasks );
router.delete('/:id', taskController.deleteTask);


module.exports = router;