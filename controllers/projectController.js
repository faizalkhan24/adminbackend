const project = require("../models/Project");

const createproject = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    const image = req.files?.image ? req.files.image[0].path : null;
    const video = req.files?.video ? req.files.video[0].path : null;

    const project = new project({
      title,
      content,
      author,
      tags,
      image,
      video,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(400).json({ message: "Error creating project post" });
  }
};

const getprojects = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; 
    const projects = await project.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ date: -1 }); 

    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Error fetching projects" });
  }
};

const getprojectById = async (req, res) => {
  try {
    // Fetch a single project post by ID
    const project = await project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    res.status(500).json({ message: "Error fetching project post" });
  }
};

// Update a project post by ID
const updateproject = async (req, res) => {
  try {
    // Extract project details from request body
    const { title, content, author, tags } = req.body;

    // Handle file uploads
    const image = req.files?.image ? req.files.image[0].path : null;
    const video = req.files?.video ? req.files.video[0].path : null;

    // Update the project post
    const project = await project.findByIdAndUpdate(
      req.params.id,
      { title, content, author, tags, image, video },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Error updating project post" });
  }
};

// Delete a project post by ID
const deleteproject = async (req, res) => {
  try {
    // Delete the project post by ID
    const project = await project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }
    res.status(200).json({ message: "project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Error deleting project post" });
  }
};

module.exports = { createproject, getprojects, getprojectById, updateproject, deleteproject };
