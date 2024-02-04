const DPTModel = require("../model/department");

const getAllDpt = async (req, res) => {
    const Hods = await DPTModel.find();

    return res.status(200).json({
        data: {
            status: true,
            data: Hods
        }
    })
}

const getOneDpt = async (req, res) => {
    const { dpt } = req.body;
    const data = await DPTModel.find({ _id: dpt });
    return res.status(200).json({
        data: {
            status: true,
            data: data
        }
    })
}


module.exports = { getAllDpt, getOneDpt }