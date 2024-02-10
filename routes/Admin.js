const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/authUtil");
const {
  addCollege,
  addPOC,
  getAllCollegesAdmin,
  searchCollege,
  getPocAdmin,
  deleteCollge,
  deletePOC,
} = require("../controller/AdminController");

router.post("/addcollege", verifyToken, addCollege);
router.post("/addPoc", verifyToken, addPOC);
router.post("/getAllCollegesAdmin", getAllCollegesAdmin);
router.post("/getPocAdmin", getPocAdmin);
router.get("/searchCollege", searchCollege);
router.post("/deleteCollge", verifyToken, deleteCollge);
router.post("/deletePOC", verifyToken, deletePOC);

module.exports = router;
