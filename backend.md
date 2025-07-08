# Bug Tracker Backend - MVP Specification

## Overview

The Bug Tracker backend is a Node.js/Express.js REST API that provides secure, role-based access to bug tracking functionality. It supports four user types with different permission levels and handles both authenticated internal users and anonymous public bug reporting.

**Tech Stack:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt

---

## 1. System Architecture

### 1.1 Layered Architecture

```
┌─────────────────────────────────────────┐
│              Routes Layer               │ ← HTTP Request Handling
├─────────────────────────────────────────┤
│            Controller Layer             │ ← Business Logic
├─────────────────────────────────────────┤
│             Service Layer               │ ← Data Processing
├─────────────────────────────────────────┤
│              Model Layer                │ ← Database Interaction
└─────────────────────────────────────────┘
```

### 1.2 Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bugController.js
│   │   ├── userController.js
│   │   └── projectController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── authorize.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Bug.js
│   │   └── Project.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── bugs.js
│   │   ├── users.js
│   │   └── projects.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── bugService.js
│   │   ├── userService.js
│   │   └── projectService.js
│   ├── utils/
│   │   ├── database.js
│   │   ├── jwt.js
│   │   └── validators.js
│   ├── config/
│   │   └── database.js
│   └── app.js
├── .env
├── .env.example
├── package.json
└── server.js
```

---

## 2. Database Schema Design

### 2.1 User Model

```javascript
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  role: {
    type: String,
    enum: ['admin', 'developer', 'tester'],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});
```

### 2.2 Bug Model

```javascript
const bugSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'closed'],
    default: 'open'
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
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
      maxlength: 100
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
        const user = await mongoose.model('User').findById(userId);
        return user && user.role === 'developer';
      },
      message: 'Assigned user must be a developer'
    }
  },
  stepsToReproduce: {
    type: String,
    maxlength: 1000
  },
  expectedBehavior: {
    type: String,
    maxlength: 1000
  },
  actualBehavior: {
    type: String,
    maxlength: 1000
  },
  progressNotes: [{
    note: {
      type: String,
      required: true,
      maxlength: 500
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
```

### 2.3 Project Model

```javascript
const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 500
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'archived'],
    default: 'active'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});
```

### 2.4 Database Indexes

```javascript
// User indexes
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

// Bug indexes
bugSchema.index({ project: 1 });
bugSchema.index({ status: 1 });
bugSchema.index({ priority: 1 });
bugSchema.index({ assignedTo: 1 });
bugSchema.index({ 'reporter.user': 1 });
bugSchema.index({ createdAt: -1 });

// Project indexes
projectSchema.index({ name: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ createdBy: 1 });
```

---

## 3. Authentication & Authorization

### 3.1 JWT Implementation

```javascript
// JWT Utility Functions
const jwt = require('jsonwebtoken');

const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
```

### 3.2 Password Security

```javascript
const bcrypt = require('bcrypt');

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
```

### 3.3 Authentication Middleware

```javascript
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user || !user.isActive) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token or user not active.' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid token.' 
    });
  }
};
```

### 3.4 Role-Based Authorization

```javascript
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required.' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Insufficient permissions.' 
      });
    }

    next();
  };
};
```

---

## 4. API Endpoints

### 4.1 Authentication Routes (`/api/auth`)

#### POST `/api/auth/register`
**Purpose:** Register new internal users (tester, developer only)
**Access:** Public
**Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string",
  "firstName": "string",
  "lastName": "string",
  "role": "tester|developer"
}
```
**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "string",
      "username": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "role": "string"
    }
  }
}
```

#### POST `/api/auth/login`
**Purpose:** Authenticate users and return JWT token
**Access:** Public
**Body:**
```json
{
  "username": "string",
  "password": "string"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "string",
    "user": {
      "id": "string",
      "username": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "role": "string"
    }
  }
}
```

#### GET `/api/auth/me`
**Purpose:** Get current user information
**Access:** Authenticated users
**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "username": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "role": "string"
    }
  }
}
```

### 4.2 Bug Routes (`/api/bugs`)

#### GET `/api/bugs`
**Purpose:** Get bugs based on user role and filters
**Access:** Authenticated users
**Query Parameters:**
- `status`: open|in-progress|closed
- `priority`: low|medium|high|critical
- `project`: project ID
- `assignedTo`: user ID (admin only)
- `page`: page number (default: 1)
- `limit`: items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "data": {
    "bugs": [
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "priority": "string",
        "status": "string",
        "project": {
          "id": "string",
          "name": "string"
        },
        "reporter": {
          "type": "internal|public",
          "user": "object|null",
          "name": "string|null",
          "email": "string|null"
        },
        "assignedTo": "object|null",
        "createdAt": "date",
        "updatedAt": "date"
      }
    ],
    "pagination": {
      "currentPage": "number",
      "totalPages": "number",
      "totalItems": "number",
      "hasNext": "boolean",
      "hasPrev": "boolean"
    }
  }
}
```

#### POST `/api/bugs`
**Purpose:** Create new bug report
**Access:** Authenticated users (internal) or Public (external)
**Body (Internal):**
```json
{
  "title": "string",
  "description": "string",
  "priority": "low|medium|high|critical",
  "project": "string",
  "stepsToReproduce": "string",
  "expectedBehavior": "string",
  "actualBehavior": "string"
}
```
**Body (Public):**
```json
{
  "title": "string",
  "description": "string",
  "priority": "low|medium|high|critical",
  "project": "string",
  "reporterName": "string",
  "reporterEmail": "string"
}
```

#### GET `/api/bugs/:id`
**Purpose:** Get specific bug details
**Access:** Role-based (own bugs for testers, assigned bugs for developers, all for admin)

#### PUT `/api/bugs/:id`
**Purpose:** Update bug information
**Access:** Role-based permissions
**Body:**
```json
{
  "title": "string",
  "description": "string",
  "priority": "string",
  "status": "string",
  "stepsToReproduce": "string",
  "expectedBehavior": "string",
  "actualBehavior": "string"
}
```

#### PUT `/api/bugs/:id/assign`
**Purpose:** Assign bug to developer
**Access:** Admin only
**Body:**
```json
{
  "assignedTo": "string"
}
```

#### PUT `/api/bugs/:id/status`
**Purpose:** Update bug status
**Access:** Assigned developer or Admin
**Body:**
```json
{
  "status": "open|in-progress|closed",
  "progressNote": "string"
}
```

#### DELETE `/api/bugs/:id`
**Purpose:** Delete bug
**Access:** Admin only

### 4.3 User Routes (`/api/users`)

#### GET `/api/users`
**Purpose:** Get all users
**Access:** Admin only
**Query Parameters:**
- `role`: admin|developer|tester
- `isActive`: true|false
- `page`: page number
- `limit`: items per page

#### POST `/api/users`
**Purpose:** Create new user (admin creates any role)
**Access:** Admin only
**Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string",
  "role": "admin|developer|tester"
}
```

#### GET `/api/users/:id`
**Purpose:** Get specific user details
**Access:** Admin or own profile

#### PUT `/api/users/:id`
**Purpose:** Update user information
**Access:** Admin or own profile
**Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "isActive": "boolean"
}
```

#### DELETE `/api/users/:id`
**Purpose:** Delete user
**Access:** Admin only

### 4.4 Project Routes (`/api/projects`)

#### GET `/api/projects`
**Purpose:** Get all projects
**Access:** Authenticated users
**Query Parameters:**
- `status`: active|inactive|archived

#### POST `/api/projects`
**Purpose:** Create new project
**Access:** Admin only
**Body:**
```json
{
  "name": "string",
  "description": "string",
  "status": "active|inactive|archived"
}
```

#### GET `/api/projects/:id`
**Purpose:** Get specific project details
**Access:** Authenticated users

#### PUT `/api/projects/:id`
**Purpose:** Update project information
**Access:** Admin only
**Body:**
```json
{
  "name": "string",
  "description": "string",
  "status": "active|inactive|archived"
}
```

#### DELETE `/api/projects/:id`
**Purpose:** Delete project
**Access:** Admin only

### 4.5 Public Routes (`/api/public`)

#### POST `/api/public/bugs`
**Purpose:** Allow public bug reporting without authentication
**Access:** Public
**Body:**
```json
{
  "title": "string",
  "description": "string",
  "priority": "low|medium|high|critical",
  "project": "string",
  "reporterName": "string",
  "reporterEmail": "string"
}
```

#### GET `/api/public/projects`
**Purpose:** Get active projects for public bug reporting
**Access:** Public

---

## 5. Middleware Implementation

### 5.1 Validation Middleware

```javascript
const { body, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User registration validation
const validateUserRegistration = [
  body('username')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('firstName')
    .notEmpty()
    .withMessage('First name is required'),
  body('lastName')
    .notEmpty()
    .withMessage('Last name is required'),
  body('role')
    .isIn(['tester', 'developer'])
    .withMessage('Role must be either tester or developer'),
  validateRequest
];

// Bug creation validation
const validateBugCreation = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 2000 })
    .withMessage('Description cannot exceed 2000 characters'),
  body('priority')
    .isIn(['low', 'medium', 'high', 'critical'])
    .withMessage('Priority must be low, medium, high, or critical'),
  body('project')
    .isMongoId()
    .withMessage('Valid project ID is required'),
  validateRequest
];
```

### 5.2 Error Handling Middleware

```javascript
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, statusCode: 404 };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 400 };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = { message, statusCode: 400 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error'
  });
};
```

### 5.3 Rate Limiting Middleware

```javascript
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.'
  }
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests, please try again later.'
  }
});
```

---

## 6. Security Implementation

### 6.1 Security Headers

```javascript
const helmet = require('helmet');
const cors = require('cors');

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

### 6.2 Input Sanitization

```javascript
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

app.use(mongoSanitize());
app.use(xss());
```

### 6.3 Environment Variables

```javascript
// .env.example
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bugtracker
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
FRONTEND_URL=http://localhost:3000
BCRYPT_ROUNDS=12
```

---

## 7. Error Handling Strategy

### 7.1 Standardized Error Responses

```javascript
// Success Response Format
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}

// Error Response Format
{
  "success": false,
  "message": "Error description",
  "errors": [] // Optional validation errors
}
```

### 7.2 Error Categories

- **400 Bad Request**: Invalid input data, validation errors
- **401 Unauthorized**: Authentication required, invalid token
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **409 Conflict**: Duplicate data, constraint violations
- **500 Internal Server Error**: Server-side errors

---

## 8. Database Configuration

### 8.1 MongoDB Connection

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};
```

### 8.2 Database Seeding

```javascript
// Initial admin user creation
const createInitialAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (!adminExists) {
      const admin = new User({
        username: 'admin',
        email: 'admin@xyzcorp.com',
        password: 'admin123',
        firstName: 'System',
        lastName: 'Administrator',
        role: 'admin'
      });
      
      await admin.save();
      console.log('Initial admin user created');
    }
  } catch (error) {
    console.error('Error creating initial admin:', error);
  }
};
```

---

## 9. Server Configuration

### 9.1 Express App Setup

```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bugs', bugRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/public', publicRoutes);

// Error handling
app.use(errorHandler);

module.exports = app;
```

### 9.2 Server Startup

```javascript
const app = require('./src/app');
const connectDB = require('./src/config/database');

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 10. Testing Strategy

### 10.1 API Testing with Postman

#### Test Collections Structure
- **Authentication Tests**: Registration, login, token validation
- **Bug Management Tests**: CRUD operations, role-based access
- **User Management Tests**: Admin operations, profile updates
- **Project Management Tests**: Project CRUD operations
- **Public API Tests**: Anonymous bug reporting

#### Test Scenarios
- Valid and invalid input data
- Authentication and authorization flows
- Role-based access control
- Error handling and edge cases
- Data validation and constraints

### 10.2 Environment Variables for Testing

```javascript
// .env.test
NODE_ENV=test
MONGODB_URI=mongodb://localhost:27017/bugtracker_test
JWT_SECRET=test-jwt-secret
JWT_EXPIRES_IN=1h
```

---

## 11. Deployment Configuration

### 11.1 Production Environment Variables

```javascript
// Production .env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bugtracker
JWT_SECRET=super-secure-production-secret
JWT_EXPIRES_IN=24h
FRONTEND_URL=https://your-frontend-domain.com
BCRYPT_ROUNDS=12
```

### 11.2 Health Check Endpoint

```javascript
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});
```

---

## 12. Performance Optimization

### 12.1 Database Query Optimization

```javascript
// Populate only necessary fields
const bugs = await Bug.find(query)
  .populate('project', 'name')
  .populate('assignedTo', 'firstName lastName username')
  .populate('reporter.user', 'firstName lastName username')
  .select('-__v')
  .sort({ createdAt: -1 })
  .limit(limit)
  .skip(skip);
```

### 12.2 Response Caching

```javascript
// Cache frequently accessed data
const getActiveProjects = async () => {
  const cacheKey = 'active_projects';
  let projects = cache.get(cacheKey);
  
  if (!projects) {
    projects = await Project.find({ status: 'active' })
      .select('name description')
      .sort({ name: 1 });
    cache.set(cacheKey, projects, 300); // 5 minutes
  }
  
  return projects;
};
```

---

## 13. MVP Scope Limitations

### 13.1 Features Included in MVP
- Complete authentication and authorization system
- Role-based access control for all endpoints
- Full CRUD operations for bugs, users, and projects
- Public bug reporting without authentication
- Bug assignment and status workflow
- Input validation and error handling
- Security middleware and rate limiting

### 13.2 Features Excluded from MVP
- Email notifications for bug updates
- File upload functionality for bug attachments
- Real-time notifications via WebSocket
- Advanced search and filtering capabilities
- Audit logs and activity tracking
- Multi-tenant/company support
- Advanced analytics and reporting
- Bulk operations for data management

This backend specification provides a complete foundation for the Bug Tracker MVP while maintaining simplicity and focusing on essential functionality. The architecture is designed to be scalable and maintainable for future enhancements.
