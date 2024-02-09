const collegeModel = require('../model/College');
const POCModel = require('../model/poc')
const bcrypt = require("bcrypt");
const sendmail = require("../utils/mailUtils");

const addCollege = async (req, res) => {
    try {
        // const user = req.user;
        const { name, about, poc,userType } = req.body;
        if (!userType === "admin") {
            return res.status(403).json({
                data: {
                    status: false,
                    msg: "Not have permission to do this task."
                }
            })
        }
        const existcollege = await collegeModel.findOne({ name: name })
        if (existcollege) {
            return res.status(200).json({
                data: {
                    status: false,
                    msg: "College exist already."
                }
            })
        }

        const college = new collegeModel({
            name: name,
            about: about,
            poc: poc,
            address: null,
            departments: null
        })
        const savedCollege = await college.save();
        //console.log(savedCollege._id);
        const upoc = await POCModel.findOneAndUpdate({ _id: poc }, { allocated_college: savedCollege._id });
        return res.status(200).json({
            data: {
                status: true,
                msg: "college added sucessfully..."
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            data: {
                status: false,
                msg: err
            }
        })
    }

};

const addPOC = async (req, res) => {
    const user = req.user;
    const { username, password, email, mobileNo, } = req.body;
    if (!user.type == "admin") {
        return res.status(403).json({
            data: {
                status: false,
                msg: "Not have permission to do this task."
            }
        })
    }
    const existpoc = await POCModel.findOne({ username: username })
    if (existpoc) {
        return res.status(200).json({
            data: {
                status: false,
                msg: "use same other username..."
            }
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const poc = new POCModel({
        username: username,
        password: hashedPassword,
        email: email,
        mobileNo: mobileNo,
        allocated_college: null
    })
    await poc.save()

    sendmail(email, username, password, "POC");
    return res.status(200).json({
        data: {
            status: 200,
            data: "created sucessfully..."
        }
    })
}

module.exports = { addCollege, addPOC };
