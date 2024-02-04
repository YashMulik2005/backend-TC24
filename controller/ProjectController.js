const ProjectModel = require("../model/projects");

const getAllprojects = async (req, res) => {
    const Hods = await ProjectModel.find();

    return res.status(200).json({
        data: {
            status: true,
            data: Hods
        }
    })
}

const getOneproject = async (req, res) => {
    const { project_id } = req.body;
    const data = await ProjectModel.find({ _id: project_id });
    return res.status(200).json({
        data: {
            status: true,
            data: data
        }
    })
}


module.exports = { getAllprojects, getOneproject }