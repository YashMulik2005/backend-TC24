const mongoose = require('mongoose');

const PocSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileNo: {
        type: Number,
        unique: true
    },
    allocated_college: {
        type: mongoose.Schema.Types.ObjectId, ref: 'college',
    },
})

const poc = mongoose.model("POC", PocSchema);

module.exports = poc;