const internModel = require("../Model/InternModel");
const collegeModel = require("../Model/CollegeModel")
const validator = require('../validator/validator');

const createIntern = async function (req, res) {
    try {
        const data = req.body
        // Checking input from req.body
        if (Object.keys(data) == 0) {
            return res.status(400).send({ status: false, msg: "Bad Request,No Data Provided" })
        };

        const { name, email, mobile, collegeId } = req.body

        // Intern name is Mandatory
        if (!validator.isValid(name)) {
            return res.status(400).send({ status: false, msg: " Intern name is required" });
        }
        // Email is Mandatory
        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, msg: " Eamil is required" });
        }
        // Mobile no is Mandatory
        if (!validator.isValid(mobile)) {
            return res.status(400).send({ status: false, msg: "Mobile number is required" });
        }
        // College Id is Mandatory
        if (!validator.isValid(collegeId)) {
            return res.status(400).send({ status: false, msg: " collegeId is required" });
        }

        // // Checking inputted name only in characters
        // let namePatern  = /^[a-zA-Z]+ [a-zA-Z]+$/;
        // if(!namePatern.test(req.body.name)){
        //     return res.status(400).send({status: false, msg:"Use characters only"})
        // }

        // This is the mail format for checking if the inputted email id perfectely formatted or not
        let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // Checking if the inputted email id perfectely formatted or not
        if (!(data.email.match(mailFormat))) {
            return res.status(400).send({ msg: "Valid Email Id is Required" })
        }

        // Checking the inputted email already exist in our data base or not
        let findEmail = await internModel.findOne({ email: data.email })
        if (findEmail) {
            return res.status(400).send({ status: false, msg: "Email id is already registered" })
        }

        // This is the moblie no format for checking if the inputted mobile no 10 digited or not
        let mobileNo = /^\d{10}$/;
        // Checking if the inputted mobile no 10 digited or not
        if (!mobileNo.test(data.mobile)) {
            return res.status(400).send({ msg: "Valid Mobile number is Required" })
        }

        // Checking the inputted mobile no already exist in our data base or not
        let findMobileNo = await internModel.findOne({ mobile: data.mobile })
        if (findMobileNo) {
            return res.status(400).send({ status: false, msg: "Mobile number is already registerd" })
        }

        // Checking valid college id from college model
        let checkCollegeId = await collegeModel.findOne({_id: data.collegeId})
        if(!checkCollegeId){
            return res.status(400).send({ status: false, msg: "College id is not valid" })
        }

        // Creating intern
        let createInterns = await internModel.create(data)
        return res.status(201).send({ status: true, msg: "Intern has been created successfully", createInterns })
    }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }

}

module.exports.createIntern = createIntern