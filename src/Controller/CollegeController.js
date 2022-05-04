// const { find } = require("../Model/CollegeModel");
const collegeModel = require("../Model/CollegeModel")
const internModel = require("../Model/InternModel")

// create collage function

const createclg = async function (req, res) {
    try {
        const { name, fullName, logoLink, isDeleted } = req.body;
        const requestBody = req.body;

        if (!requestBody.name) {
            return res.status(400).send({ status: false, msg: "Name is required" });
        }
        if (!requestBody.fullName) {
            return res.status(400).send({ status: false, msg: "FullName is required" });
        }
        if (!requestBody.logoLink) {
            return res.status(400).send({ status: false, msg: "logoLink is required" });
        }

        let findCollege = await collegeModel.findOne({ name: requestBody.name })
        // console.log(findCollege)
        if (findCollege) {
            return res.status(400).send({ status: false, msg: "college already exist" })
        }

        let validUrlPattern = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
        if (!validUrlPattern.test(requestBody.logoLink)) {
            return res.status(400).send({ status: false, msg: "Not a valid URL" })
        }

        let createCollege = await collegeModel.create(requestBody);

        return res.status(201).send({ status: true, msg: "College has been created successfully", createCollege })

    }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }

}

const getInterns = async function (req, res) {
    try {
        let collegeName = req.query.collegeName

        if (!collegeName) {
            return res.status(400).send({ status: false, msg: "College name is rquired" })
        }

        let findCollege = await collegeModel.findOne({ name: collegeName })
        if (!findCollege) {
            return res.status(400).send({ status: false, msg: "This college is not found" })
        }

        let findInterns = await internModel.find({ collegeId: findCollege._id, isDeleted: false },
            { collegeId: 0, isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 })
            // console.log(findInterns)

        if (findInterns.length == 0) {
            return res.status(404).send({ status: false, msg: "No intern is resisterd for this college" })
        }

        res.status(200).send({
            status: true,
            data: {
                "name": findCollege.name,
                "fullName": findCollege.fullName,
                "logoLink": findCollege.logoLink,
                "interests": findInterns
            }
        })

    }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}


module.exports.createclg = createclg
module.exports.getInterns = getInterns
