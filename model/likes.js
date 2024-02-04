const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    project_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'projects',
        requied: true
    },
    liked_by: {
        type: mongoose.Schema.Types.ObjectId, ref: 'AuthModel',
        requied: true
    },
    time: {
        type: Date,
        default: Date.now
    }
})

const likes = mongoose.model("likes", likeSchema);

module.exports = likes;