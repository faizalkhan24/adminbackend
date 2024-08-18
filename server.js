const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('Portfolio Backend API');
});

// Route imports
const reviewRoutes = require('./routes/reviewRoutes');
const blogRoutes = require('./routes/blogRoutes');
const projectRoutes = require('./routes/projectsRoutes');

const authRoutes = require('./routes/authRoutes');

// Use Routes
app.use('/api/reviews', reviewRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);

// Protect Routes
const protect = require('./middleware/authMiddleware');

// Admin protected routes
app.use('/api/admin/reviews', protect, reviewRoutes);
app.use('/api/admin/blogs', protect, blogRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
