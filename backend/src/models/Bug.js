const mongoose = require('mongoose');
const validator = require('validator');

const bugSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Bug title is required'],
    trim: true,
    maxlength: [200, 'Bug title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Bug description is required'],
    maxlength: [2000, 'Bug description cannot exceed 2000 characters']
  },
  priority: {
    type: String,
    enum: {
      values: ['low', 'medium', 'high', 'critical'],
      message: 'Priority must be low, medium, high, or critical'
    },
    default: 'medium'
  },
  status: {
    type: String,
    enum: {
      values: ['open', 'in-progress', 'closed'],
      message: 'Status must be open, in-progress, or closed'
    },
    default: 'open'
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Project is required']
  },
  reporter: {
    type: {
      type: String,
      enum: ['internal', 'public'],
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: function() { return this.reporter.type === 'internal'; }
    },
    name: {
      type: String,
      required: function() { return this.reporter.type === 'public'; },
      maxlength: [100, 'Reporter name cannot exceed 100 characters']
    },
    email: {
      type: String,
      validate: [validator.isEmail, 'Invalid email'],
      required: function() { return this.reporter.type === 'public'; }
    }
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    validate: {
      validator: async function(userId) {
        if (!userId) return true;
        const User = mongoose.model('User');
        const user = await User.findById(userId);
        return user && user.role === 'developer';
      },
      message: 'Assigned user must be a developer'
    }
  },
  stepsToReproduce: {
    type: String,
    maxlength: [1000, 'Steps to reproduce cannot exceed 1000 characters']
  },
  expectedBehavior: {
    type: String,
    maxlength: [1000, 'Expected behavior cannot exceed 1000 characters']
  },
  actualBehavior: {
    type: String,
    maxlength: [1000, 'Actual behavior cannot exceed 1000 characters']
  },
  progressNotes: [{
    note: {
      type: String,
      required: true,
      maxlength: [500, 'Progress note cannot exceed 500 characters']
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Indexes for better query performance
bugSchema.index({ project: 1 });
bugSchema.index({ status: 1 });
bugSchema.index({ priority: 1 });
bugSchema.index({ assignedTo: 1 });
bugSchema.index({ 'reporter.user': 1 });
bugSchema.index({ createdAt: -1 });

// Transform output
bugSchema.methods.toJSON = function() {
  const bugObject = this.toObject();
  delete bugObject.__v;
  return bugObject;
};

module.exports = mongoose.model('Bug', bugSchema);
