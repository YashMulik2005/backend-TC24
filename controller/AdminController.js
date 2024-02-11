const collegeModel = require("../model/College");
const POCModel = require("../model/poc");
const bcrypt = require("bcrypt");
const sendmail = require("../utils/mailUtils");
const addCollege = async (req, res) => {
  try {
    // const user = req.user;
    const { name, about,address, userType } = req.body;
    if (userType !== "admin") {
      return res.status(200).json({
        data: {
          status: false,
          msg: "Not have permission to do this task.",
        },
      });
    }
    const existcollege = await collegeModel.findOne({ name: name });
    if (existcollege) {
      return res.status(200).json({
        data: {
          status: false,
          msg: "College exist already.",
        },
      });
    }

    const college = new collegeModel({
      name: name,
      about: about,
      address: address,
    });
    const savedCollege = await college.save();
    //console.log(savedCollege._id);
    // const upoc = await POCModel.findOneAndUpdate({ _id: poc }, { allocated_college: savedCollege._id });
    return res.status(200).json({
      data: {
        status: true,
        msg: "College added sucessfully...",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      data: {
        status: false,
        msg: err,
      },
    });
  }
};

const addPOC = async (req, res) => {
  const { username, password, email, mobileNo, college, userType } = req.body;
  console.log("college", college);
  if (!userType == "admin") {
    return res.status(403).json({
      data: {
        status: false,
        msg: "Not have permission to do this task.",
      },
    });
  }
  const existpoc = await POCModel.findOne({ username: username });
  if (existpoc) {
    return res.status(200).json({
      data: {
        status: false,
        msg: "use same other username...",
      },
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const poc = new POCModel({
    username: username,
    password: hashedPassword,
    email: email,
    mobileNo: mobileNo,
    College: college,
  });
  await poc.save();

  sendmail(email, username, password, "POC");
  return res.status(200).json({
    data: {
      status: 200,
      msg: "created sucessfully...",
    },
  });
};

const getAllCollegesAdmin = async (req, res) => {
  const { page, rows } = req.body;
  const currentPage = page + 1;
  console.log(page, rows);
  // const skip = (currentPage - 1) * rows;
  const offset = Math.ceil((currentPage - 1) * rows);
  const Hods = await collegeModel.find().skip(offset).limit(rows);
  const totalColleges = await collegeModel.countDocuments();
  return res.status(200).json({
    data: {
      status: true,
      data: Hods,
      totalColleges: totalColleges,
    },
  });
};

const searchCollege = async (req, res) => {
  try {
    const { search } = req.query; // Get the search query from the query parameters

    const faculties = await collegeModel.find({
      $or: [
        { name: { $regex: ".*" + search + ".*", $options: "i" } },
        { about: { $regex: ".*" + search + ".*", $options: "i" } },
        { address: { $regex: ".*" + search + ".*", $options: "i" } },
      ],
    });

    res.status(200).send({ success: true, faculties });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

const getPocAdmin = async (req, res) => {
  const { page, rows } = req.body;
  const currentPage = page + 1;
  console.log(page, rows);
  // const skip = (currentPage - 1) * rows;
  const offset = Math.ceil((currentPage - 1) * rows);
  const pocS = await POCModel.find({}).populate("College");
  const totalColleges = await POCModel.countDocuments();
  return res.status(200).json({
    data: {
      status: true,
      data: pocS,
      totalColleges: totalColleges,
    },
  });
};

const deleteCollege = async (req, res) => {
  const { college_id,userType } = req.body;
  console.log(college_id);
    if (userType !== "admin") {
    return res.status(200).json({
      data: {
        status: false,
        msg: "Not have permission to do this task.",
      },
    });
  }

  const college = await collegeModel.findByIdAndDelete(college_id);

  if (!college) {
    return res.status(200).json({
      data: {
        status: false,
        msg: "College not found.",
      },
    });
  }

  return res.status(200).json({
    data: {
      status: true,
      msg: "College Deleted Successfully !",
    },
  });
};

const deletePOC = async (req, res) => {
  const { poc_id } = req.body;
  const user = req.user;
  if (user.type != "admin") {
    return res.status(403).json({
      data: {
        status: false,
        msg: "Not have permission to do this task.",
      },
    });
  }

  const collge = await POCModel.findByIdAndDelete(poc_id);

  if (!collge) {
    return res.status(404).json({
      data: {
        status: false,
        msg: "POC not found.",
      },
    });
  }

  return res.status(200).json({
    data: {
      status: true,
      msg: "delete sucessfully...",
    },
  });
};

const editCollege = async (req, res) => {
  try {
    const { id, name, about, address, userType } = req.body;
    if (userType !== "admin") {
      return res.status(200).json({
        data: {
          status: false,
          msg: "You do not have permission to perform this action.",
        },
      });
    }

    const existingCollege = await collegeModel.findById(id);
    if (!existingCollege) {
      return res.status(200).json({
        data: {
          status: false,
          msg: "College not found.",
        },
      });
    }
    if(existingCollege.name === name && existingCollege.about === about &&
      existingCollege.address === address ){
        return res.status(200).json({
          data: {
            status: true,
            msg: "No Changes In College Details.",
          },
        });
    }
    existingCollege.name = name;
    existingCollege.about = about;
    existingCollege.address = address;

    const updatedCollege = await existingCollege.save();

    return res.status(200).json({
      data: {
        status: true,
        msg: "College Updated Successfully.",
        updatedCollege: updatedCollege,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      data: {
        status: false,
        msg: "Error occurred while updating college.",
      },
    });
  }
};

module.exports = {
  addCollege,
  addPOC,
  getAllCollegesAdmin,
  searchCollege,
  getPocAdmin,
  deleteCollege,
  deletePOC,editCollege
};
