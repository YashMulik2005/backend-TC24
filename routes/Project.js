const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/authUtil');
const { getAllprojects, getOneproject, filterproject, search } = require("../controller/ProjectController");

router.get("/getallprojects", getAllprojects);
router.post("/getoneproject", getOneproject);
router.post("/filter", filterproject);
router.post("/search", search);

module.exports = router;