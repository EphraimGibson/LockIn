const express = require('express')
const router = express.Router();
const refreshTokenController = require('../controllers/refresh-tokenController');

router.post('/', refreshTokenController)

module.exports = router;