const collegeModel = require('../model/College');
const POCModel = require('../model/poc')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const DepartmentModel = require("../model/department");
const HODModel = require("../model/hod");
const sendmail = require("../utils/mailUtils");

dotenv.config()
const jwtkey = process.env.jwt_key;

const getPoc = async (req, res) => {
    try {
        const POC = await POCModel.find();
        return res.status(200).json({
            data: {
                status: true,
                data: POC
            }
        })
    } catch (err) {
        return res.status(400).json({
            data: {
                status: false,
                data: err
            }
        })
    }
}

const addCollegeInfo = async (req, res) => {
    const user = req.user;
    if (user.type != "POC") {
        return res.status(403).json({
            data: {
                status: false,
                msg: "No access to do this..."
            }
        })
    }

    try {
        const { college_id, name, about, address, } = req.body;
        const college = await collegeModel.findOneAndUpdate({ _id: college_id }, { name: name, about: about, address: address, poc: user._id });
        return res.status(200).json({
            data: {
                status: true,
                msg: "updated suceessfully.."
            }
        })
    } catch (err) {
        return res.status(400).json({
            data: {
                status: false,
                msg: err,
            }
        })
    }
}

const POClogin = async (req, res) => {
    const { username, password } = req.body;
    const existpoc = await POCModel.findOne({ username: username })
    if (!existpoc) {
        return res.status(400).json({
            data: {
                status: false,
                msg: "username or password is invalid."
            }
        })
    }

    const match = await bcrypt.compare(password, existpoc.password);
    if (match) {
        const data = {
            id: existpoc._id,
            name: existpoc.username,
            email: existpoc.email,
            type: "POC",
        }
        const token = jwt.sign(data, jwtkey);
        return res.status(200).json({
            data: {
                status: true,
                msg: "login sucessful...",
                token: token
            }
        })
    }
    return res.status(400).json({
        data: {
            status: false,
            msg: "username or password is invalid.",
        }
    })
}


const addDepartmentc = async (req, res) => {
    const { name, about, college, HOD } = req.body;
    const user = req.user;
    if (user.type != "POC") {
        return res.status(403).json({
            data: {
                status: false,
                msg: "No access to do this..."
            }
        })
    }

    const existdpt = await DepartmentModel.findOne({ name: name, college: college });

    if (existdpt) {
        return res.status(400).json({
            data: {
                status: 400,
                msg: "department already exist...."
            }
        })
    }

    const department = new DepartmentModel({
        name: name,
        about: about,
        college: college,
        hod: HOD
    })

    const savedDpt = await department.save();

    const UpdateHod = await HODModel.findOneAndUpdate({ _id: HOD }, { allocated_department: savedDpt._id });

    const clg = await collegeModel.findOne({ _id: college });
    if (clg.departments == null) {
        const newdpt = [savedDpt._id];
        const Updateclg = await collegeModel.findOneAndUpdate({ _id: college }, { departments: newdpt });
    } else {
        const newdpt = [savedDpt._id, ...clg.departments];
        const Updateclg = await collegeModel.findOneAndUpdate({ _id: college }, { departments: newdpt });
    }
    return res.status(200).json({
        dara: {
            status: true,
            msg: "department added.."
        }
    })

}

const addHOD = async (req, res) => {
    const user = req.user;
    if (user.type != "POC") {
        return res.status(403).json({
            data: {
                status: false,
                msg: "No access to do this..."
            }
        })
    }

    const { username, password, email, mobileNo, allocated_college } = req.body;
    const existhod = await HODModel.findOne({ username: username })
    if (existhod) {
        return res.status(200).json({
            data: {
                status: false,
                msg: "use same other username..."
            }
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hod = new HODModel({
        username: username,
        password: hashedPassword,
        email: email,
        mobileNo: mobileNo,
        allocated_college: allocated_college,
        userType: "HOD",
        allocated_department: null,
    })
    await hod.save()

    sendmail(email, username, password, "HOD");

    return res.status(200).json({
        data: {
            status: 200,
            data: "created sucessfully..."
        }
    })

}

const getOnePOC = async (req, res) => {
    const { poc } = req.body;
    const data = await POCModel.find({ _id: poc });
    return res.status(200).json({
        data: {
            status: true,
            data: data
        }
    })
}

const deleteDPT = async (req, res) => {
    const { dpt_id } = req.body;
    const user = req.user;
    if (user.type != "POC") {
        return res.status(403).json({
            data: {
                status: false,
                msg: "Not have permission to do this task."
            }
        })
    }

    const collge = await DepartmentModel.findByIdAndDelete(dpt_id);

    if (!collge) {
        return res.status(404).json({
            data: {
                status: false,
                msg: "Department not found."
            }
        });
    }

    return res.status(200).json({
        data: {
            status: true,
            msg: "delete sucessfully..."
        }
    })
}

const deleteHOD = async (req, res) => {
    const { hod_id } = req.body;
    const user = req.user;
    if (user.type != "POC") {
        return res.status(403).json({
            data: {
                status: false,
                msg: "Not have permission to do this task."
            }
        })
    }

    const collge = await HODModel.findByIdAndDelete(hod_id);

    if (!collge) {
        return res.status(404).json({
            data: {
                status: false,
                msg: "HOD not found."
            }
        });
    }

    return res.status(200).json({
        data: {
            status: true,
            msg: "delete sucessfully..."
        }
    })
}

module.exports = { getPoc, addCollegeInfo, POClogin, addDepartmentc, addHOD, getOnePOC, deleteDPT, deleteHOD };
