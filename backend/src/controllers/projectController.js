const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res) => {
  try {
    const { status } = req.query;
    
    let query = {};
    if (status) query.status = status;

    const projects = await Project.find(query)
      .populate('createdBy', 'firstName lastName username')
      .sort({ createdAt: -1 });

    // Get bug counts for each project
    const Bug = require('../models/Bug');
    const projectsWithBugCounts = await Promise.all(
      projects.map(async (project) => {
        const bugCount = await Bug.countDocuments({ project: project._id });
        return {
          ...project.toObject(),
          bugsCount: bugCount
        };
      })
    );

    res.json({
      success: true,
      data: { projects: projectsWithBugCounts }
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get active projects for public use
// @route   GET /api/public/projects
// @access  Public
const getActiveProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: 'active' })
      .select('name description')
      .sort({ name: 1 });

    res.json({
      success: true,
      data: { projects }
    });
  } catch (error) {
    console.error('Get active projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Admin only
const createProject = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    // Check if project name already exists
    const existingProject = await Project.findOne({ name });
    if (existingProject) {
      return res.status(400).json({
        success: false,
        message: 'Project with this name already exists'
      });
    }

    const project = new Project({
      name,
      description,
      status: status || 'active',
      createdBy: req.user._id
    });

    await project.save();
    await project.populate('createdBy', 'firstName lastName username');

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: { project }
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private
const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('createdBy', 'firstName lastName username');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: { project }
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Admin only
const updateProject = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if new name conflicts with existing project
    if (name && name !== project.name) {
      const existingProject = await Project.findOne({ name });
      if (existingProject) {
        return res.status(400).json({
          success: false,
          message: 'Project with this name already exists'
        });
      }
    }

    // Update fields
    if (name) project.name = name;
    if (description) project.description = description;
    if (status) project.status = status;

    await project.save();
    await project.populate('createdBy', 'firstName lastName username');

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: { project }
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Admin only
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if project has associated bugs
    const Bug = require('../models/Bug');
    const bugCount = await Bug.countDocuments({ project: req.params.id });
    
    if (bugCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete project. It has ${bugCount} associated bug(s). Please reassign or delete the bugs first.`
      });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getProjects,
  getActiveProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject
};
