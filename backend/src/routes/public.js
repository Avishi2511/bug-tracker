const express = require('express');
const { createPublicBug } = require('../controllers/bugController');
const { getActiveProjects } = require('../controllers/projectController');
const { validatePublicBugCreation } = require('../middleware/validation');

const router = express.Router();

// @route   POST /api/public/bugs
// @desc    Create public bug report
// @access  Public
router.post('/bugs', validatePublicBugCreation, createPublicBug);

// @route   GET /api/public/projects
// @desc    Get active projects for public bug reporting
// @access  Public
router.get('/projects', getActiveProjects);

module.exports = router;
