const express = require('express');
const router = express.Router();
const LoginUser = require('../controllers/loginController');

router.post('/',LoginUser)

module.exports = router;