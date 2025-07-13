// Mock project data for testing - matches backend Project model
export const mockProjects = [
  {
    _id: '507f1f77bcf86cd799439021',
    name: 'Bug Tracker Web App',
    description: 'Main bug tracking web application for comprehensive project management and issue tracking',
    status: 'active',
    createdBy: '507f1f77bcf86cd799439011', // Admin user
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-16T10:30:00.000Z',
    bugsCount: 15
  },
  {
    _id: '507f1f77bcf86cd799439022',
    name: 'Mobile Application',
    description: 'iOS and Android mobile app for bug tracking on the go',
    status: 'active',
    createdBy: '507f1f77bcf86cd799439011', // Admin user
    createdAt: '2024-01-05T00:00:00.000Z',
    updatedAt: '2024-01-15T14:20:00.000Z',
    bugsCount: 8
  },
  {
    _id: '507f1f77bcf86cd799439023',
    name: 'API Gateway Service',
    description: 'Microservices API gateway and authentication service for backend infrastructure',
    status: 'active',
    createdBy: '507f1f77bcf86cd799439011', // Admin user
    createdAt: '2024-01-10T00:00:00.000Z',
    updatedAt: '2024-01-14T16:45:00.000Z',
    bugsCount: 5
  },
  {
    _id: '507f1f77bcf86cd799439024',
    name: 'Legacy System Migration',
    description: 'Migration project for old legacy system being phased out',
    status: 'inactive',
    createdBy: '507f1f77bcf86cd799439011', // Admin user
    createdAt: '2023-12-01T00:00:00.000Z',
    updatedAt: '2024-01-08T12:00:00.000Z',
    bugsCount: 2
  },
  {
    _id: '507f1f77bcf86cd799439025',
    name: 'Analytics Dashboard',
    description: 'Real-time analytics and reporting dashboard for business intelligence',
    status: 'active',
    createdBy: '507f1f77bcf86cd799439011', // Admin user
    createdAt: '2024-01-12T00:00:00.000Z',
    updatedAt: '2024-01-16T11:30:00.000Z',
    bugsCount: 3
  },
  {
    _id: '507f1f77bcf86cd799439026',
    name: 'Documentation Portal',
    description: 'Internal documentation and knowledge base portal',
    status: 'archived',
    createdBy: '507f1f77bcf86cd799439011', // Admin user
    createdAt: '2023-11-15T00:00:00.000Z',
    updatedAt: '2023-12-20T00:00:00.000Z',
    bugsCount: 0
  }
];

// Helper functions for project data
export const getProjectsByStatus = (status) => {
  return mockProjects.filter(project => project.status === status);
};

export const getActiveProjects = () => {
  return mockProjects.filter(project => project.status === 'active');
};

export const getProjectById = (id) => {
  return mockProjects.find(project => project._id === id);
};

export const getProjectStats = () => {
  const total = mockProjects.length;
  const active = mockProjects.filter(project => project.status === 'active').length;
  const inactive = mockProjects.filter(project => project.status === 'inactive').length;
  const archived = mockProjects.filter(project => project.status === 'archived').length;
  const totalBugs = mockProjects.reduce((sum, project) => sum + project.bugsCount, 0);

  return {
    total,
    active,
    inactive,
    archived,
    totalBugs
  };
};

export const getProjectsWithBugCounts = () => {
  return mockProjects.map(project => ({
    ...project,
    bugsCount: project.bugsCount || 0
  }));
};
