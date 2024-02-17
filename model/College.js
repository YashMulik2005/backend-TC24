const mongoose = require("mongoose");

const collegeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  about: {
    type: String,
  },
  address: {
    type: String,
  },
  photo: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const college = mongoose.model("College", collegeSchema);

module.exports = college;
