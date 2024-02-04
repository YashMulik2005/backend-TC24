const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/authUtil');
const { addCollege, addPOC } = require('../controller/AdminController')

router.post("/addcollege", verifyToken, addCollege);
router.post("/addPoc", verifyToken, addPOC)

module.exports = router;
