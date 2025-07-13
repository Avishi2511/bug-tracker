// Mock user data for backend seeding
const mockUsers = [
  {
    _id: '507f1f77bcf86cd799439011',
    username: 'admin',
    email: 'admin@bugtracker.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-16T10:30:00.000Z',
    lastLogin: '2024-01-16T10:30:00.000Z'
  },
  {
    _id: '507f1f77bcf86cd799439012',
    username: 'john_dev',
    email: 'john@bugtracker.com',
    firstName: 'John',
    lastName: 'Developer',
    role: 'developer',
    isActive: true,
    createdAt: '2024-01-05T00:00:00.000Z',
    updatedAt: '2024-01-15T14:20:00.000Z',
    lastLogin: '2024-01-15T14:20:00.000Z'
  },
  {
    _id: '507f1f77bcf86cd799439013',
    username: 'jane_tester',
    email: 'jane@bugtracker.com',
    firstName: 'Jane',
    lastName: 'Tester',
    role: 'tester',
    isActive: true,
    createdAt: '2024-01-10T00:00:00.000Z',
    updatedAt: '2024-01-14T16:45:00.000Z',
    lastLogin: '2024-01-14T16:45:00.000Z'
  },
  {
    _id: '507f1f77bcf86cd799439014',
    username: 'mike_dev',
    email: 'mike@bugtracker.com',
    firstName: 'Mike',
    lastName: 'Developer',
    role: 'developer',
    isActive: true,
    createdAt: '2024-01-08T00:00:00.000Z',
    updatedAt: '2024-01-16T09:15:00.000Z',
    lastLogin: '2024-01-16T09:15:00.000Z'
  },
  {
    _id: '507f1f77bcf86cd799439015',
    username: 'sarah_tester',
    email: 'sarah@bugtracker.com',
    firstName: 'Sarah',
    lastName: 'Tester',
    role: 'tester',
    isActive: true,
    createdAt: '2024-01-12T00:00:00.000Z',
    updatedAt: '2024-01-16T11:30:00.000Z',
    lastLogin: '2024-01-16T11:30:00.000Z'
  },
  {
    _id: '507f1f77bcf86cd799439016',
    username: 'alex_dev',
    email: 'alex@bugtracker.com',
    firstName: 'Alex',
    lastName: 'Developer',
    role: 'developer',
    isActive: false,
    createdAt: '2024-01-03T00:00:00.000Z',
    updatedAt: '2024-01-10T00:00:00.000Z',
    lastLogin: '2024-01-08T12:00:00.000Z'
  }
];

module.exports = { mockUsers };
