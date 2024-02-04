const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/authUtil');
const { addLike, disLike } = require("../controller/LikeController");

router.post("/addlike", verifyToken, addLike);
router.post("/dislike", verifyToken, disLike);

module.exports = router;