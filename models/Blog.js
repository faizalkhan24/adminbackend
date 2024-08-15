const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
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
        type: String, // URL or file path to the image
    },
    video: {
        type: String, // URL or file path to the video
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Blog', BlogSchema);
