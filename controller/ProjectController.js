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

const filterproject = async (req, res) => {
    const { time, type } = req.body;
    let projects;

    try {
        if (type === "all") {
            if (time === "oldest") {
                projects = await ProjectModel.find().sort({ time: 1 });
            } else {
                projects = await ProjectModel.find().sort({ time: -1 });
            }
        } else {
            if (time === "oldest") {
                projects = await ProjectModel.find({ type: type }).sort({ time: 1 });
            } else {
                projects = await ProjectModel.find({ type: type }).sort({ time: -1 });
            }
        }

        return res.status(200).json({ success: true, data: projects });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const search = async (req, res) => {
    const { title } = req.body;
    console.log(title);
    try {
        const projects = await ProjectModel.find({ title: { $regex: ".*" + title + ".*", $options: "i" } });
        if (projects) {
            return res.status(200).json({
                data: { projects }
            });
        }
        return res.status(404).json({ success: falsee, data: "not found" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const addProjectByStudent =async (req,res)=>{
    try{
     const {title,description,multimedia,contributers,live_demo,livecount,commentcount,type,allocated_college,created_By} =req.body
     console.log(title,description,multimedia,contributers,live_demo,livecount,commentcount,type,allocated_college,created_By)

     

    }catch (error) {
    console.error("Error:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
}
module.exports = { getAllprojects, getOneproject, filterproject, search ,addProjectByStudent }