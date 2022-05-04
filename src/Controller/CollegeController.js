const collegeModel = require("../Model/CollegeModel")

// create collage function

const createclg = async function (req, res) {
    try {
        const { name, fullName, logoLink, isDeleted } = req.body;
        const requestBody = req.body;
        // // if(Object.keys(requestBody).length==0){
        //     return res.status(400).send({
        //     status:false,
        //     msg:" Invalid request parameters. Provide college .details",
        // });

        if (!requestBody.name) {
            return res.status(400).send({ status: false, msg: " name is required" });
        }
        if (!requestBody.fullName) {
            return res.status(400).send({ status: false, msg: " fullName is required" });
        }
        if (!requestBody.logoLink) {
            return res.status(400).send({ status: false, msg: "logoLink is required" });
        }
        const unique = await collegeModel.find({ name: requestBody.name })
        if (!unique)
            return res.status(400).send({ status: false, msg: "college already exist" })

        const createCollege = await collegeModel.create(requestBody);

        return res.status(201).send({ status: true, msg: "College has been created successfully", createCollege })

    }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }

}

module.exports.createclg = createclg
