const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');

router.post('/',taskController);

module.exports = router;