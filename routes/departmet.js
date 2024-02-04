const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/authUtil');
const { getAllDpt, getOneDpt } = require("../controller/DepartmentController");

router.get("/adddpt", getAllDpt);
router.post("/onedpt", getOneDpt);


module.exports = router;
