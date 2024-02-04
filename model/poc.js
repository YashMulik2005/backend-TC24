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
    },
    email: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: Number,
    },
    allocated_college: {
        type: mongoose.Schema.Types.ObjectId, ref: 'college',
    },
})

const poc = mongoose.model("POC", PocSchema);

module.exports = poc;