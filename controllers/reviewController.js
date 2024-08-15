const Review = require('../models/Review');

// Create a new review
const createReview = async (req, res) => {
    const { name, email, rating, comment } = req.body;

    try {
        // Validate input
        if (!name || !email || !rating || !comment) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Create and save the new review
        const review = new Review(req.body);
        await review.save();

        res.status(201).json({
            _id: review._id,
            name: review.name,
            email: review.email,
            rating: review.rating,
            comment: review.comment,
            date: review.date,
        });
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(400).json({ message: 'Error creating review' });
    }
};

// Get all reviews with optional pagination
const getReviews = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10
        const reviews = await Review.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ date: -1 }); // Sort by date descending

        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Error fetching reviews' });
    }
};

module.exports = { createReview, getReviews };
