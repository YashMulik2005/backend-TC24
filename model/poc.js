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
    College: {
        type: mongoose.Schema.Types.ObjectId, ref: 'College',
        required:true
    },
})

const poc = mongoose.model("POC", PocSchema);

module.exports = poc;