const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/authUtil');
const { getAllprojects, getOneproject } = require("../controller/ProjectController");

router.get("/getallprojects", getAllprojects);
router.post("/getoneproject", getOneproject);

module.exports = router;