const express = require('express')
const router = express.Router();
const collegeController= require('../Controller/CollegeController')

router.post ("/functionup/colleges", collegeController.createclg)


 module.exports = router;