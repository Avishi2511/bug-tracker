const express = require('express');
const {
  getBugs,
  createBug,
  getBug,
  updateBug,
  deleteBug,
  assignBug,
  updateBugStatus,
  createPublicBug
} = require('../controllers/bugController');
const { validateBugCreation, validatePublicBugCreation } = require('../middleware/validation');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// @route   GET /api/bugs
// @desc    Get bugs based on user role
// @access  Private
router.get('/', auth, getBugs);

// @route   POST /api/bugs
// @desc    Create new bug
// @access  Private (Tester, Developer, Admin)
router.post('/', auth, validateBugCreation, createBug);

// @route   GET /api/bugs/:id
// @desc    Get single bug
// @access  Private (Role-based)
router.get('/:id', auth, getBug);

// @route   PUT /api/bugs/:id
// @desc    Update bug
// @access  Private (Role-based)
router.put('/:id', auth, updateBug);

// @route   DELETE /api/bugs/:id
// @desc    Delete bug
// @access  Admin only
router.delete('/:id', auth, authorize('admin'), deleteBug);

// @route   PUT /api/bugs/:id/assign
// @desc    Assign bug to developer
// @access  Admin only
router.put('/:id/assign', auth, authorize('admin'), assignBug);

// @route   PUT /api/bugs/:id/status
// @desc    Update bug status
// @access  Assigned developer or Admin
router.put('/:id/status', auth, authorize('developer', 'admin'), updateBugStatus);

module.exports = router;
