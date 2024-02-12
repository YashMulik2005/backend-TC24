const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    about: {
        type: String
    },
    college: {
        type: mongoose.Schema.Types.ObjectId, ref: 'College'
    },
    hod: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Department',
        default:null
    },
    time: {
        type: Date,
        default: Date.now
    }
})

const dapartments = mongoose.model("dapartments", departmentSchema);

module.exports = dapartments;