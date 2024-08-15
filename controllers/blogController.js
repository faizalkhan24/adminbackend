const Blog = require("../models/Blog");

// Create a new blog post
const createBlog = async (req, res) => {
  try {
    // Extract blog details from request body
    const { title, content, author, tags } = req.body;

    // Handle file uploads
    const image = req.files?.image ? req.files.image[0].path : null;
    const video = req.files?.video ? req.files.video[0].path : null;

    // Create a new blog post
    const blog = new Blog({
      title,
      content,
      author,
      tags,
      image,
      video,
    });

    // Save blog to the database
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(400).json({ message: "Error creating blog post" });
  }
};

// Get all blog posts with optional pagination
const getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10

    // Fetch blogs with pagination and sorting
    const blogs = await Blog.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ date: -1 }); // Sort by date descending

    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Error fetching blogs" });
  }
};

// Get a single blog post by ID
const getBlogById = async (req, res) => {
  try {
    // Fetch a single blog post by ID
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    res.status(500).json({ message: "Error fetching blog post" });
  }
};

// Update a blog post by ID
const updateBlog = async (req, res) => {
  try {
    // Extract blog details from request body
    const { title, content, author, tags } = req.body;

    // Handle file uploads
    const image = req.files?.image ? req.files.image[0].path : null;
    const video = req.files?.video ? req.files.video[0].path : null;

    // Update the blog post
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, author, tags, image, video },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Error updating blog post" });
  }
};

// Delete a blog post by ID
const deleteBlog = async (req, res) => {
  try {
    // Delete the blog post by ID
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Error deleting blog post" });
  }
};

module.exports = { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog };
