const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } = require('../controllers/blogController');

// Public Routes
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), createBlog);
router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.put('/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;
