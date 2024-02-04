const express = require('express');
const router = express.Router();
const { authLogin, authSignup, test } = require('../controller/AuthController')
const verifyToken = require("../utils/authUtil")

router.post('/login', authLogin);
router.post('/signup', authSignup);
router.get('/test', verifyToken, test)

module.exports = router;