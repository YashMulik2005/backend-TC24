const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/authUtil');
const { getPoc, addCollegeInfo, POClogin, addDepartmentPoc, addHOD, getOnePOC, deleteDPT, deleteHOD } = require("../controller/PocController")

//router.post("/addcollege", verifyToken, addCollege);
router.get("/allpoc", verifyToken, getPoc)
router.post("/collegeDetails", verifyToken, addCollegeInfo)
router.post("/addDepartmentPoc", verifyToken, addDepartmentPoc)
router.post("/addHod", verifyToken, addHOD)
router.post("/delete_DPT", verifyToken, deleteDPT)
router.post("/delete_HOD", verifyToken, deleteHOD)

router.post("/PocLogin", POClogin)
router.post("/getonepoc", getOnePOC)


module.exports = router;
