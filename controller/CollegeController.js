const CollegeModel = require("../model/College");

const getAllColleges = async (req, res) => {
    const Hods = await CollegeModel.find();
    const totalColleges = await CollegeModel.countDocuments();
    return res.status(200).json({
        data: {
            status: true,
            data: Hods,
            totalColleges:totalColleges
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

// const addCollege = async(req,res)=>{
//     const {name,about,address,poc,departments} = req.body
//     const data = await CollegeModel.find({ name: name });
//     console.log("data",data);
//     if(data.length){
//         return res.status(200).json({
//             data: {
//                 status: false,
//                 msg:'College Already Exists'
//             }
//         })
//     }
//     const college = new CollegeModel({
//        name:name,
//        about:about,
//        address:address,
//        poc:poc,
//        departments:departments
      
//     })
//     await college.save()
//     return res.status(200).json({
//         data: {
//             status: true,
//             msg: 'College Created Successfully'
//         }
//     })

// }


module.exports = { getAllColleges, getOneCollege }