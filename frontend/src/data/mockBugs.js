// Mock bug data for testing - matches backend Bug model
export const mockBugs = [
  {
    _id: '507f1f77bcf86cd799439031',
    title: 'Login authentication failure',
    description: 'Users cannot log in with valid credentials. The system returns "Invalid credentials" even with correct username and password.',
    status: 'open',
    priority: 'critical',
    project: '507f1f77bcf86cd799439021', // Bug Tracker Web App
    assignedTo: '507f1f77bcf86cd799439012', // John Developer
    reportedBy: '507f1f77bcf86cd799439013', // Jane Tester
    stepsToReproduce: '1. Go to login page\n2. Enter valid credentials\n3. Click login button\n4. Observe error message',
    expectedBehavior: 'User should be logged in and redirected to dashboard',
    actualBehavior: 'Error message appears saying "Invalid credentials"',
    environment: 'Production',
    browserVersion: 'Chrome 120.0',
    createdAt: '2024-01-16T08:30:00.000Z',
    updatedAt: '2024-01-16T08:30:00.000Z'
  },
  {
    _id: '507f1f77bcf86cd799439032',
    title: 'Dashboard loading performance issue',
    description: 'Dashboard takes too long to load user data and statistics, causing poor user experience',
    status: 'in-progress',
    priority: 'high',
    project: '507f1f77bcf86cd799439021', // Bug Tracker Web App
    assignedTo: '507f1f77bcf86cd799439014', // Mike Developer
    reportedBy: '507f1f77bcf86cd799439015', // Sarah Tester
    stepsToReproduce: '1. Login to application\n2. Navigate to dashboard\n3. Wait for page to load\n4. Observe loading time',
    expectedBehavior: 'Dashboard should load within 3 seconds',
    actualBehavior: 'Dashboard takes 15-20 seconds to load',
    environment: 'Production',
    browserVersion: 'Firefox 121.0',
    createdAt: '2024-01-15T14:20:00.000Z',
    updatedAt: '2024-01-16T09:15:00.000Z'
  },
  {
    _id: '507f1f77bcf86cd799439033',
    title: 'Minor UI alignment issue in sidebar',
    description: 'Sidebar menu items are slightly misaligned on smaller screens, affecting visual consistency',
    status: 'closed',
    priority: 'low',
    project: '507f1f77bcf86cd799439021', // Bug Tracker Web App
    assignedTo: '507f1f77bcf86cd799439012', // John Developer
    reportedBy: '507f1f77bcf86cd799439013', // Jane Tester
    stepsToReproduce: '1. Open application on mobile device\n2. Navigate to any page with sidebar\n3. Observe menu alignment',
    expectedBehavior: 'Menu items should be properly aligned',
    actualBehavior: 'Menu items appear slightly off-center',
    environment: 'Production',
    browserVersion: 'Mobile Safari',
    createdAt: '2024-01-10T10:00:00.000Z',
    updatedAt: '2024-01-12T16:30:00.000Z'
  },
  {
    _id: '507f1f77bcf86cd799439034',
    title: 'Mobile app crash on bug submission',
    description: 'Mobile application crashes when users try to submit a new bug report',
    status: 'open',
    priority: 'critical',
    project: '507f1f77bcf86cd799439022', // Mobile Application
    assignedTo: '507f1f77bcf86cd799439014', // Mike Developer
    reportedBy: '507f1f77bcf86cd799439015', // Sarah Tester
    stepsToReproduce: '1. Open mobile app\n2. Navigate to bug report form\n3. Fill out all required fields\n4. Tap submit button',
    expectedBehavior: 'Bug should be submitted successfully',
    actualBehavior: 'App crashes and returns to home screen',
    environment: 'Production',
    browserVersion: 'iOS 17.2',
    createdAt: '2024-01-14T11:45:00.000Z',
    updatedAt: '2024-01-14T11:45:00.000Z'
  },
  {
    _id: '507f1f77bcf86cd799439035',
    title: 'API rate limiting not working correctly',
    description: 'API gateway is not properly enforcing rate limits, allowing potential abuse',
    status: 'in-progress',
    priority: 'high',
    project: '507f1f77bcf86cd799439023', // API Gateway Service
    assignedTo: '507f1f77bcf86cd799439012', // John Developer
    reportedBy: '507f1f77bcf86cd799439013', // Jane Tester
    stepsToReproduce: '1. Make rapid API calls exceeding limit\n2. Observe response codes\n3. Check rate limiting headers',
    expectedBehavior: 'API should return 429 status after limit exceeded',
    actualBehavior: 'API continues to process requests without rate limiting',
    environment: 'Staging',
    browserVersion: 'Postman',
    createdAt: '2024-01-13T09:20:00.000Z',
    updatedAt: '2024-01-15T14:30:00.000Z'
  },
  {
    _id: '507f1f77bcf86cd799439036',
    title: 'Search functionality returns incorrect results',
    description: 'Bug search feature returns irrelevant results and misses exact matches',
    status: 'open',
    priority: 'medium',
    project: '507f1f77bcf86cd799439021', // Bug Tracker Web App
    assignedTo: '507f1f77bcf86cd799439014', // Mike Developer
    reportedBy: '507f1f77bcf86cd799439015', // Sarah Tester
    stepsToReproduce: '1. Go to bug search page\n2. Enter specific bug title\n3. Click search\n4. Review results',
    expectedBehavior: 'Should return exact matches first, then related results',
    actualBehavior: 'Returns unrelated bugs and misses exact matches',
    environment: 'Production',
    browserVersion: 'Chrome 120.0',
    createdAt: '2024-01-12T15:10:00.000Z',
    updatedAt: '2024-01-12T15:10:00.000Z'
  },
  {
    _id: '507f1f77bcf86cd799439037',
    title: 'Email notifications not being sent',
    description: 'Users are not receiving email notifications for bug status updates',
    status: 'open',
    priority: 'medium',
    project: '507f1f77bcf86cd799439021', // Bug Tracker Web App
    assignedTo: '507f1f77bcf86cd799439012', // John Developer
    reportedBy: '507f1f77bcf86cd799439013', // Jane Tester
    stepsToReproduce: '1. Update bug status\n2. Check email notifications settings\n3. Wait for email\n4. Check spam folder',
    expectedBehavior: 'Email notification should be sent within 5 minutes',
    actualBehavior: 'No email notifications are received',
    environment: 'Production',
    browserVersion: 'N/A',
    createdAt: '2024-01-11T13:25:00.000Z',
    updatedAt: '2024-01-11T13:25:00.000Z'
  },
  {
    _id: '507f1f77bcf86cd799439038',
    title: 'Analytics dashboard shows incorrect data',
    description: 'Bug statistics and charts display outdated or incorrect information',
    status: 'in-progress',
    priority: 'medium',
    project: '507f1f77bcf86cd799439025', // Analytics Dashboard
    assignedTo: '507f1f77bcf86cd799439014', // Mike Developer
    reportedBy: '507f1f77bcf86cd799439015', // Sarah Tester
    stepsToReproduce: '1. Navigate to analytics dashboard\n2. Compare displayed data with actual bug counts\n3. Check date ranges',
    expectedBehavior: 'Dashboard should show real-time accurate data',
    actualBehavior: 'Data is outdated by several hours or incorrect',
    environment: 'Production',
    browserVersion: 'Chrome 120.0',
    createdAt: '2024-01-09T16:40:00.000Z',
    updatedAt: '2024-01-14T10:20:00.000Z'
  }
];

// Helper functions for bug data
export const getBugsByStatus = (status) => {
  return mockBugs.filter(bug => bug.status === status);
};

export const getBugsByPriority = (priority) => {
  return mockBugs.filter(bug => bug.priority === priority);
};

export const getBugsByProject = (projectId) => {
  return mockBugs.filter(bug => bug.project === projectId);
};

export const getBugsByAssignee = (userId) => {
  return mockBugs.filter(bug => bug.assignedTo === userId);
};

export const getBugsByReporter = (userId) => {
  return mockBugs.filter(bug => bug.reportedBy === userId);
};

export const getBugById = (id) => {
  return mockBugs.find(bug => bug._id === id);
};

export const getBugStats = () => {
  const total = mockBugs.length;
  const open = mockBugs.filter(bug => bug.status === 'open').length;
  const inProgress = mockBugs.filter(bug => bug.status === 'in-progress').length;
  const closed = mockBugs.filter(bug => bug.status === 'closed').length;

  const priorityStats = {
    critical: mockBugs.filter(bug => bug.priority === 'critical').length,
    high: mockBugs.filter(bug => bug.priority === 'high').length,
    medium: mockBugs.filter(bug => bug.priority === 'medium').length,
    low: mockBugs.filter(bug => bug.priority === 'low').length
  };

  return {
    total,
    open,
    inProgress,
    closed,
    priorityStats
  };
};

// Get bugs with populated user and project names (for display)
export const getBugsWithDetails = () => {
  // This would normally be done with database population
  // For mock data, we'll return the bugs as-is since we have IDs
  return mockBugs;
};

// Filter bugs by multiple criteria
export const filterBugs = (filters) => {
  let filtered = [...mockBugs];

  if (filters.status && filters.status !== 'all') {
    filtered = filtered.filter(bug => bug.status === filters.status);
  }

  if (filters.priority && filters.priority !== 'all') {
    filtered = filtered.filter(bug => bug.priority === filters.priority);
  }

  if (filters.project && filters.project !== 'all') {
    filtered = filtered.filter(bug => bug.project === filters.project);
  }

  if (filters.assignedTo && filters.assignedTo !== 'all') {
    filtered = filtered.filter(bug => bug.assignedTo === filters.assignedTo);
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(bug => 
      bug.title.toLowerCase().includes(searchTerm) ||
      bug.description.toLowerCase().includes(searchTerm)
    );
  }

  return filtered;
};
