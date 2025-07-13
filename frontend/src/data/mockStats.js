// Mock statistics data for testing dashboards
export const getAdminDashboardStats = () => ({
  totalBugs: 247,
  activeUsers: 18,
  activeProjects: 5,
  recentActivity: [
    {
      id: 1,
      message: 'New bug reported: Login page crash',
      timestamp: '2 minutes ago',
      type: 'bug',
      priority: 'critical'
    },
    {
      id: 2,
      message: 'User John Doe registered',
      timestamp: '15 minutes ago',
      type: 'user'
    },
    {
      id: 3,
      message: 'Bug #123 marked as resolved',
      timestamp: '1 hour ago',
      type: 'bug',
      priority: 'resolved'
    }
  ]
});

export const getDeveloperDashboardStats = () => ({
  assignedBugs: 12,
  priorityBreakdown: {
    critical: 2,
    high: 4,
    medium: 5,
    low: 1
  },
  currentWork: [
    {
      id: '507f1f77bcf86cd799439031',
      title: 'Login authentication failure',
      bugId: '#001',
      assignedAt: '2 hours ago',
      priority: 'critical'
    },
    {
      id: '507f1f77bcf86cd799439032',
      title: 'Dashboard loading performance issue',
      bugId: '#002',
      assignedAt: '1 day ago',
      priority: 'high'
    },
    {
      id: '507f1f77bcf86cd799439036',
      title: 'Search functionality returns incorrect results',
      bugId: '#003',
      assignedAt: '3 days ago',
      priority: 'medium'
    }
  ]
});

export const getTesterDashboardStats = () => ({
  bugsReported: 28,
  statusBreakdown: {
    open: 8,
    inProgress: 12,
    closed: 8
  },
  recentReports: [
    {
      id: '507f1f77bcf86cd799439031',
      title: 'Search functionality not working',
      bugId: '#028',
      reportedAt: '1 hour ago',
      status: 'open',
      priority: 'high'
    },
    {
      id: '507f1f77bcf86cd799439034',
      title: 'Button alignment issue on mobile',
      bugId: '#027',
      reportedAt: '3 hours ago',
      status: 'in-progress',
      priority: 'medium'
    },
    {
      id: '507f1f77bcf86cd799439033',
      title: 'Form validation error message',
      bugId: '#026',
      reportedAt: 'yesterday',
      status: 'closed',
      priority: 'low'
    },
    {
      id: '507f1f77bcf86cd799439032',
      title: 'Dashboard loading timeout',
      bugId: '#025',
      reportedAt: '2 days ago',
      status: 'in-progress',
      priority: 'critical'
    }
  ]
});
