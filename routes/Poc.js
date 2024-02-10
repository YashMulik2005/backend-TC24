const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/authUtil');
const { getPoc, addCollegeInfo, POClogin, addDepartmentc, addHOD, getOnePOC, deleteDPT, deleteHOD } = require("../controller/PocController")

//router.post("/addcollege", verifyToken, addCollege);
router.get("/allpoc", verifyToken, getPoc)
router.post("/collegeDetails", verifyToken, addCollegeInfo)
router.post("/addDepartment", verifyToken, addDepartmentc)
router.post("/addHod", verifyToken, addHOD)
router.post("/delete_DPT", verifyToken, deleteDPT)
router.post("/delete_HOD", verifyToken, deleteHOD)

router.post("/Poclogin", POClogin)
router.post("/getonepoc", getOnePOC)


module.exports = router;
