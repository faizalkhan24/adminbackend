const mongoose = require('mongoose');

// Define the Review schema
const ReviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, // Trim whitespace from name
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Store email in lowercase
        match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Invalid email format'], // Email format validation
    },
    rating: {
        type: Number,
        required: true,
        min: 1, // Minimum rating value
        max: 5, // Maximum rating value
    },
    comment: {
        type: String,
        required: true,
        trim: true, // Trim whitespace from comment
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create the Review model
module.exports = mongoose.model('Review', ReviewSchema);
