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
  poc: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AuthModel",
  },
  departments: {
    type: [String],
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const college = mongoose.model("collge", collegeSchema);

module.exports = college;
