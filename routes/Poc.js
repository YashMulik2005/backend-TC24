const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/authUtil');
const { getPoc, addCollegeInfo, POClogin, addDepartmentPoc, addHOD, getOnePOC, deleteDPT, deleteHOD,editDepartmentPoc,getAllHod,editHodPoc,editCollegeInfo,getOneCollege ,pocDashboardDetails,searchDepartment,searchHod} = require("../controller/PocController")

//router.post("/addcollege", verifyToken, addCollege);
router.get("/allpoc", verifyToken, getPoc)
router.post("/collegeDetails", verifyToken, addCollegeInfo)
router.post("/addDepartmentPoc", verifyToken, addDepartmentPoc)
router.post("/addHod", verifyToken, addHOD)
router.post("/deleteDPT", verifyToken, deleteDPT)
router.post("/delete_HOD", verifyToken, deleteHOD)

router.post("/PocLogin", POClogin)
router.post("/getonepoc", getOnePOC)
router.post("/editDepartmentPoc",editDepartmentPoc)
router.post("/getAllHodPoc",getAllHod)
router.post("/editHodPoc",verifyToken,editHodPoc)
router.post("/editCollegeInfo",editCollegeInfo)
router.post("/getOneCollege",getOneCollege)
router.post("/pocDashboardDetails",pocDashboardDetails)

router.post("/searchDepartment",searchDepartment)
router.post("/searchHod",searchHod)
module.exports = router;
