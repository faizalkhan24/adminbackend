const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    tags: [String],
    image: {
        type: String, 
    },
    video: {
        type: String, 
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Project', ProjectSchema);
