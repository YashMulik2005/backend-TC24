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
        type: mongoose.Schema.Types.ObjectId, ref: 'college'
    },
    hod: {
        type: mongoose.Schema.Types.ObjectId, ref: 'AuthModel'
    },

    time: {
        type: Date,
        default: Date.now
    }
})

const dapartments = mongoose.model("dapartments", departmentSchema);

module.exports = dapartments;