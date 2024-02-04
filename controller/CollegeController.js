const CollegeModel = require("../model/College");

const getAllCollge = async (req, res) => {
    const Hods = await CollegeModel.find();

    return res.status(200).json({
        data: {
            status: true,
            data: Hods
        }
    })
}

const getOneCollege = async (req, res) => {
    const { college } = req.body;
    const data = await CollegeModel.find({ _id: college });
    return res.status(200).json({
        data: {
            status: true,
            data: data
        }
    })
}


module.exports = { getAllCollge, getOneCollege }