const mongoose = require('mongoose');

const saveSchema = mongoose.Schema({
    project_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'projects',
        requied: true
    },
    saved_by: {
        type: mongoose.Schema.Types.ObjectId, ref: 'AuthModel',
        requied: true
    },
    time: {
        type: Date,
        default: Date.now
    }
})

const save = mongoose.model("save", saveSchema);

module.exports = save;