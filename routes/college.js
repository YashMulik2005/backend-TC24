const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/authUtil');
const { getAllCollge, getOneCollege } = require("../controller/CollegeController");

router.get("/allCollge", getAllCollge)
router.post("/onecollge", getOneCollege)

module.exports = router;
