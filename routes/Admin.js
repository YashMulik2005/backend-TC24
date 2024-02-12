const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/authUtil");
const {
  addCollege,
  addPOC,
  getAllCollegesAdmin,
  searchCollege,
  getPocAdmin,
  deleteCollege,
  deletePOC,editCollege,editPoc,searchPoc,getTotalCount
} = require("../controller/AdminController");

router.post("/addcollege", verifyToken, addCollege);
router.post("/addPoc", verifyToken, addPOC);
router.post("/getAllCollegesAdmin", getAllCollegesAdmin);
router.post("/getPocAdmin", getPocAdmin);
router.get("/searchCollege", searchCollege);
router.post("/deleteCollege", verifyToken, deleteCollege);
router.post("/deletePOC", verifyToken, deletePOC);
router.post('/editCollege', verifyToken, editCollege);
router.post('/editPoc', verifyToken, editPoc);
router.get('/searchPoc', searchPoc);
router.get('/getTotalCount', getTotalCount);
module.exports = router;
