const express = require('express')
const router = express.Router();
const collegeController = require('../Controller/CollegeController')
const internController = require('../Controller/internController')

router.post("/functionup/colleges", collegeController.createclg)

router.post("/functionup/interns", internController.createIntern)

router.get("/functionup/collegeDetails", collegeController.getInterns)


module.exports = router;