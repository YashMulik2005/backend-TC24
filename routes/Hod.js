const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/authUtil');
const { getAllHod, getOneHod, addProject, HodLogin, deleteproject } = require("../controller/HodController")

router.get('/addhod', getAllHod)
router.post("/onehod", getOneHod)
router.post("/Hodlogin", HodLogin);

router.post("/addProject", verifyToken, addProject);
router.post("/deleteProject", verifyToken, deleteproject);

module.exports = router;