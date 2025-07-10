const express = require('express');
const {
  getProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { validateProjectCreation } = require('../middleware/validation');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// @route   GET /api/projects
// @desc    Get all projects
// @access  Private
router.get('/', auth, getProjects);

// @route   POST /api/projects
// @desc    Create new project
// @access  Admin only
router.post('/', auth, authorize('admin'), validateProjectCreation, createProject);

// @route   GET /api/projects/:id
// @desc    Get single project
// @access  Private
router.get('/:id', auth, getProject);

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Admin only
router.put('/:id', auth, authorize('admin'), updateProject);

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Admin only
router.delete('/:id', auth, authorize('admin'), deleteProject);

module.exports = router;
