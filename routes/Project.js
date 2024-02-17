const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/authUtil');
const { getAllprojects, getOneproject, filterproject, search ,addProjectByStudent,getAllProjectsByCollege,searchStudentsProj} = require("../controller/ProjectController");

router.get("/getallprojects", getAllprojects);
router.post("/getoneproject", getOneproject);
router.post("/filter", filterproject);
router.post("/search", search);
router.post("/addProjectByStudent", addProjectByStudent);
router.post("/getAllProjectsByCollege", getAllProjectsByCollege);
router.post("/searchStudentsProj", searchStudentsProj);


module.exports = router;