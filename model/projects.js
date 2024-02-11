const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    multimedia: {
        type: [String]
    },
    contributers: {
        type: {
            c1: String,
            c2: String,
            c3: String,
            c4: String
        },
        required: true
    },
    live_demo: {
        type: String,
    },
    likecount: {
        type: Number,
        default: 0
    },
    commentcount: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        required: true
    },
    allocated_college: {
        type: mongoose.Schema.Types.ObjectId, ref: 'college'
    },
    allocated_department: {
        type: mongoose.Schema.Types.ObjectId, ref: 'dapartments'
    },
    time: {
        type: Date,
        default: Date.now
    }
})

const projects = mongoose.model("projects", projectSchema);

module.exports = projects;