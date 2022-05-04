const internModel = require("../Model/InternModel")

const createIntern = async function (req, res) {
    try {
        const { name, email, mobile, collegeId, isDeleted } = req.body
        const requestBody = req.body;

        if (!requestBody.name) {
            return res.status(400).send({ status: false, msg: " name is required" });
        }
        if (!requestBody.email) {
            return res.status(400).send({ status: false, msg: " eamil is required" });
        }
        if (!requestBody.mobile) {
            return res.status(400).send({ status: false, msg: "Mobile number is required" });
        }
        if (!requestBody.collegeId) {
            return res.status(400).send({ status: false, msg: " collegeId is required" });
        }

        // This is the mail format for checking if the inputted email id perfectely formatted or not
        let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // Checking if the inputted email id perfectely formatted or not
        if (!(requestBody.email.match(mailFormat))) {
            return res.status(400).send({ msg: "Valid Email Id is Required" })
        }

        let findEmail = await internModel.findOne({ email: requestBody.email })
        if (findEmail) {
            return res.status(400).send({ status: false, msg: "Email id is already registered" })
        }

        let mobileNo = /^\d{10}$/;
        // Checking if the inputted mobile no 10 digited or not
        if (!mobileNo.test(requestBody.mobile)) {
            return res.status(400).send({ msg: "Valid Mobile number is Required" })
        }

        let findMobileNo = await internModel.findOne({ mobile: requestBody.mobile })
        if (findMobileNo) {
            return res.status(400).send({ status: false, msg: "Mobile number is already registerd" })
        }

        let createInterns = await internModel.create(requestBody)
        return res.status(201).send({ status: true, msg: "Intern has been created successfully", createInterns })
    }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }

}

module.exports.createIntern = createIntern