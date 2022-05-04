

const internModel = require("../Model/InternModel")

const createIntern = async function(req,res){
    try{
        const { name, email, mobile, collegeId,isDeleted} =req.body
        const requestBody= req.body;

        if (!requestBody.name){
            return res.status(400).send({ status:false, msg:" name is required"});
        }
        if(!requestBody.email){
            return res.status(400).send({ status:false, msg:" eamil is required"});
        }
        if(!requestBody.mobile){
            return res.status(400).send({ status:false, msg:" mobile is required"});
        }
        if(!requestBody.collegeId){
            return res.status(400).send({ status:false, msg:" collegeId is required"});
        }
        // This is the mail format for checking if the inputted email id perfectely formatted or not
        let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // Checking if the inputted email id perfectely formatted or not
        if (!(requestBody.email.match(mailFormat))) {
            return res.status(400).send({msg: "Valid Email Id is Required"})
        }


        let mobileFormat = /^\d{10}$/;
        // Checking if the inputted email id perfectely formatted or not
        if (!(requestBody.mobile.match(mobileFormat))) {
            return res.status(400).send({msg: "Valid Mobile number is Required"})
        }
 }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }

}
module.exports.createIntern = createIntern