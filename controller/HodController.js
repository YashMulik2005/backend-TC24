const HodModel = require("../model/hod");
const ProjectModel = require("../model/projects");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');

dotenv.config()
const jwtkey = process.env.jwt_key;

const getAllHod = async (req, res) => {
    const Hods = await HodModel.find();

    return res.status(200).json({
        data: {
            status: true,
            data: Hods
        }
    })
}

const getOneHod = async (req, res) => {
    const { hod } = req.body;
    const data = await HodModel.find({ _id: hod });
    return res.status(200).json({
        data: {
            status: true,
            data: data
        }
    })
}

const addProject = async (req, res) => {
    const user = req.user;
    if (user.type != "HOD") {
        return res.status(403).json({
            data: {
                status: false,
                msg: "Not have permission  to do this task."
            }
        })
    }

    const { title, description, multimedia, contributers, live_demo, college, department } = req.body;

    const existProject = await ProjectModel.findOne({ title: title, allocated_college: college });
    if (existProject) {
        return res.status(400).json({
            data: {
                status: false,
                msg: "Project with same name exist in your collage."
            }
        })
    }

    const project = new ProjectModel({
        title: title,
        description: description,
        multimedia: multimedia,
        contributers: contributers,
        live_demo: live_demo,
        allocated_college: college,
        allocated_department: department
    })
    await project.save();

    return res.status(200).json({
        data: {
            status: true,
            msg: "Project added sucessfully...."
        }
    })
}

const HodLogin = async (req, res) => {
    const { username, password } = req.body;

    const Hod = await HodModel.findOne({ username: username });
    if (!Hod) {
        return res.status(400).json({
            data: {
                status: false,
                msg: "username or password is invalid..."
            }
        })
    }

    const match = await bcrypt.compare(password, Hod.password);
    if (match) {
        const data = {
            id: Hod._id,
            name: Hod.username,
            email: Hod.email,
            type: "HOD",
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

module.exports = { getAllHod, getOneHod, addProject, HodLogin }