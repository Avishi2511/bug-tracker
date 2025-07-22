const Bug = require('../models/Bug');
const Project = require('../models/Project');

// @desc    Get bugs based on user role
// @route   GET /api/bugs
// @access  Private
const getBugs = async (req, res) => {
  try {
    const { status, priority, project, assignedTo, page = 1, limit = 10 } = req.query;
    const user = req.user;

    // Build query based on user role
    let query = {};

    // Role-based filtering
    if (user.role === 'tester') {
      // Testers can only see bugs they reported
      query['reporter.user'] = user._id;
    } else if (user.role === 'developer') {
      // Developers can see bugs assigned to them
      query.assignedTo = user._id;
    }
    // Admins can see all bugs (no additional filtering)

    // Apply filters
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (project) query.project = project;
    if (assignedTo && user.role === 'admin') query.assignedTo = assignedTo;

    const skip = (page - 1) * limit;

    const bugs = await Bug.find(query)
      .populate('project', 'name description')
      .populate('assignedTo', 'firstName lastName username')
      .populate('reporter.user', 'firstName lastName username')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Bug.countDocuments(query);

    res.json({
      success: true,
      data: {
        bugs,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get bugs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new bug
// @route   POST /api/bugs
// @access  Private
const createBug = async (req, res) => {
  try {
    const { title, description, priority, project, stepsToReproduce, expectedBehavior, actualBehavior } = req.body;

    // Verify project exists
    const projectExists = await Project.findById(project);
    if (!projectExists) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const bug = new Bug({
      title,
      description,
      priority,
      project,
      reporter: {
        type: 'internal',
        user: req.user._id
      },
      stepsToReproduce,
      expectedBehavior,
      actualBehavior
    });

    await bug.save();
    await bug.populate('project', 'name description');
    await bug.populate('reporter.user', 'firstName lastName username');

    res.status(201).json({
      success: true,
      message: 'Bug created successfully',
      data: { bug }
    });
  } catch (error) {
    console.error('Create bug error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single bug
// @route   GET /api/bugs/:id
// @access  Private
const getBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id)
      .populate('project', 'name description')
      .populate('assignedTo', 'firstName lastName username')
      .populate('reporter.user', 'firstName lastName username')
      .populate('progressNotes.addedBy', 'firstName lastName username');

    if (!bug) {
      return res.status(404).json({
        success: false,
        message: 'Bug not found'
      });
    }

    // Check permissions
    const user = req.user;
    if (user.role === 'tester' && bug.reporter.user.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
    if (user.role === 'developer' && bug.assignedTo?.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: { bug }
    });
  } catch (error) {
    console.error('Get bug error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update bug
// @route   PUT /api/bugs/:id
// @access  Private
const updateBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) {
      return res.status(404).json({
        success: false,
        message: 'Bug not found'
      });
    }

    // Check permissions
    const user = req.user;
    if (user.role === 'tester' && bug.reporter.user.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
    if (user.role === 'developer' && bug.assignedTo?.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const { title, description, priority, status, stepsToReproduce, expectedBehavior, actualBehavior } = req.body;

    // Update fields
    if (title) bug.title = title;
    if (description) bug.description = description;
    if (priority) bug.priority = priority;
    if (status) bug.status = status;
    if (stepsToReproduce) bug.stepsToReproduce = stepsToReproduce;
    if (expectedBehavior) bug.expectedBehavior = expectedBehavior;
    if (actualBehavior) bug.actualBehavior = actualBehavior;

    await bug.save();
    await bug.populate('project', 'name description');
    await bug.populate('assignedTo', 'firstName lastName username');
    await bug.populate('reporter.user', 'firstName lastName username');

    res.json({
      success: true,
      message: 'Bug updated successfully',
      data: { bug }
    });
  } catch (error) {
    console.error('Update bug error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete bug
// @route   DELETE /api/bugs/:id
// @access  Admin only
const deleteBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) {
      return res.status(404).json({
        success: false,
        message: 'Bug not found'
      });
    }

    await Bug.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Bug deleted successfully'
    });
  } catch (error) {
    console.error('Delete bug error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Assign bug to developer
// @route   PUT /api/bugs/:id/assign
// @access  Admin only
const assignBug = async (req, res) => {
  try {
    const { assignedTo } = req.body;
    
    const bug = await Bug.findById(req.params.id);
    if (!bug) {
      return res.status(404).json({
        success: false,
        message: 'Bug not found'
      });
    }

    bug.assignedTo = assignedTo;
    await bug.save();
    await bug.populate('assignedTo', 'firstName lastName username');

    res.json({
      success: true,
      message: 'Bug assigned successfully',
      data: { bug }
    });
  } catch (error) {
    console.error('Assign bug error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update bug status with progress note
// @route   PUT /api/bugs/:id/status
// @access  Assigned developer or Admin
const updateBugStatus = async (req, res) => {
  try {
    const { status, progressNote } = req.body;
    
    const bug = await Bug.findById(req.params.id);
    if (!bug) {
      return res.status(404).json({
        success: false,
        message: 'Bug not found'
      });
    }

    // Check if user can update status
    const user = req.user;
    if (user.role === 'developer' && bug.assignedTo?.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only update status of bugs assigned to you'
      });
    }

    bug.status = status;
    
    if (progressNote) {
      bug.progressNotes.push({
        note: progressNote,
        addedBy: user._id
      });
    }

    await bug.save();
    await bug.populate('assignedTo', 'firstName lastName username');
    await bug.populate('progressNotes.addedBy', 'firstName lastName username');

    res.json({
      success: true,
      message: 'Bug status updated successfully',
      data: { bug }
    });
  } catch (error) {
    console.error('Update bug status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create public bug report
// @route   POST /api/public/bugs
// @access  Public
const createPublicBug = async (req, res) => {
  try {
    const { title, description, priority, project, reporterName, reporterEmail } = req.body;

    // Verify project exists and is active
    const projectExists = await Project.findOne({ _id: project, status: 'active' });
    if (!projectExists) {
      return res.status(404).json({
        success: false,
        message: 'Project not found or inactive'
      });
    }

    // Build reporter object with optional fields
    const reporter = {
      type: 'public'
    };
    
    if (reporterName && reporterName.trim()) {
      reporter.name = reporterName.trim();
    }
    
    if (reporterEmail && reporterEmail.trim()) {
      reporter.email = reporterEmail.trim();
    }

    const bug = new Bug({
      title,
      description,
      priority,
      project,
      reporter
    });

    await bug.save();
    await bug.populate('project', 'name description');

    res.status(201).json({
      success: true,
      message: 'Bug report submitted successfully',
      data: { 
        bug: {
          id: bug._id,
          title: bug.title,
          priority: bug.priority,
          project: bug.project
        }
      }
    });
  } catch (error) {
    console.error('Create public bug error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getBugs,
  createBug,
  getBug,
  updateBug,
  deleteBug,
  assignBug,
  updateBugStatus,
  createPublicBug
};
