const express = require('express')
const router = express.Router();
const collegeController = require('../Controller/CollegeController')
const internController = require('../Controller/internController')
//  const validator = require('../validator/validator')



router.post("/functionup/colleges", collegeController.createCollege)

router.post("/functionup/interns", internController.createIntern)

router.get("/functionup/collegeDetails", collegeController.getInterns)


module.exports = router;