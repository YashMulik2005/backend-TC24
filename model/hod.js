const mongoose = require('mongoose');

const HodSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: Number,
    },
    allocated_college: {
        type: mongoose.Schema.Types.ObjectId, ref: 'college'
    },
    allocated_department: {
        type: mongoose.Schema.Types.ObjectId, ref: 'dapartments'
    }

})

const HodModel = mongoose.model("HOD", HodSchema);

module.exports = HodModel;