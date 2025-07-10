import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/common/Navbar';

const WorkHistoryPage = () => {
  const navigate = useNavigate();
  const [workHistory, setWorkHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [filters, setFilters] = useState({
    timeRange: 'all',
    status: 'all',
    priority: 'all'
  });

  const handleNavigation = (tab) => {
    switch (tab) {
      case 'dashboard':
        navigate('/developer');
        break;
      case 'assigned':
        navigate('/developer/assigned');
        break;
      case 'history':
        navigate('/developer/history');
        break;
      default:
        break;
    }
  };

  // Mock data for work history
  const mockWorkHistory = [
    {
      id: 1,
      title: 'User profile update bug',
      description: 'Fixed issue where user profile changes were not being saved',
      status: 'closed',
      priority: 'medium',
      project: 'Web Application',
      completedAt: '2024-01-15',
      timeSpent: '4 hours',
      resolution: 'Fixed database transaction issue in user update endpoint'
    },
    {
      id: 2,
      title: 'Email notification system failure',
      description: 'Resolved email service integration problems',
      status: 'closed',
      priority: 'high',
      project: 'Web Application',
      completedAt: '2024-01-12',
      timeSpent: '6 hours',
      resolution: 'Updated email service configuration and added retry logic'
    },
    {
      id: 3,
      title: 'Mobile responsive layout issues',
      description: 'Fixed various layout problems on mobile devices',
      status: 'closed',
      priority: 'medium',
      project: 'Web Application',
      completedAt: '2024-01-08',
      timeSpent: '8 hours',
      resolution: 'Implemented responsive CSS fixes and updated media queries'
    },
    {
      id: 4,
      title: 'API rate limiting implementation',
      description: 'Added rate limiting to prevent API abuse',
      status: 'closed',
      priority: 'high',
      project: 'API Service',
      completedAt: '2024-01-05',
      timeSpent: '12 hours',
      resolution: 'Implemented Redis-based rate limiting with configurable thresholds'
    },
    {
      id: 5,
      title: 'Search functionality optimization',
      description: 'Improved search performance and accuracy',
      status: 'closed',
      priority: 'medium',
      project: 'Web Application',
      completedAt: '2024-01-02',
      timeSpent: '10 hours',
      resolution: 'Optimized database queries and added search indexing'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setWorkHistory(mockWorkHistory);
      setFilteredHistory(mockWorkHistory);
    }, 500);

    // Animation trigger
    const elements = document.querySelectorAll('.fade-in, .slide-in-left');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 100);
    });
  }, []);

  useEffect(() => {
    let filtered = workHistory;

    if (filters.timeRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters.timeRange) {
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          filterDate.setMonth(now.getMonth() - 3);
          break;
      }
      
      filtered = filtered.filter(item => new Date(item.completedAt) >= filterDate);
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(item => item.status === filters.status);
    }

    if (filters.priority !== 'all') {
      filtered = filtered.filter(item => item.priority === filters.priority);
    }

    setFilteredHistory(filtered);
  }, [filters, workHistory]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  const getStats = () => {
    const totalBugs = workHistory.length;
    const totalHours = workHistory.reduce((sum, item) => {
      const hours = parseInt(item.timeSpent.split(' ')[0]);
      return sum + hours;
    }, 0);
    const avgTimePerBug = totalBugs > 0 ? (totalHours / totalBugs).toFixed(1) : 0;
    
    const priorityStats = {
      critical: workHistory.filter(item => item.priority === 'critical').length,
      high: workHistory.filter(item => item.priority === 'high').length,
      medium: workHistory.filter(item => item.priority === 'medium').length,
      low: workHistory.filter(item => item.priority === 'low').length
    };

    return { totalBugs, totalHours, avgTimePerBug, priorityStats };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-card-bg min-h-screen border-r border-gray-700">
          <div className="p-6">
            <h2 className="text-lg font-bold text-text-primary mb-6">Navigation</h2>
            <nav className="space-y-2">
              <button 
                onClick={() => handleNavigation('dashboard')}
                className="slide-in-left w-full text-left px-4 py-3 rounded-lg text-text-primary hover:bg-gray-700 transition-all duration-300"
              >
                Dashboard
              </button>
              <button 
                onClick={() => handleNavigation('assigned')}
                className="slide-in-left w-full text-left px-4 py-3 rounded-lg text-text-primary hover:bg-gray-700 transition-all duration-300"
              >
                Assigned Bugs
              </button>
              <button className="slide-in-left w-full text-left px-4 py-3 rounded-lg bg-accent-red text-white transition-all duration-300">
                Work History
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Breadcrumb */}
          <div className="fade-in bg-gray-800 px-4 py-2 rounded-lg mb-6">
            <span className="text-text-muted text-sm">Home &gt; Work History</span>
          </div>

          {/* Page Header */}
          <div className="fade-in mb-6">
            <h1 className="text-2xl font-bold text-text-primary mb-2">Work History</h1>
            <p className="text-text-muted">Track your completed work and performance metrics</p>
          </div>

          {/* Statistics Cards */}
          <div className="fade-in grid md:grid-cols-4 gap-6 mb-6">
            <div className="bg-card-bg p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-bold text-text-primary mb-2">Total Completed</h3>
              <div className="text-3xl font-bold text-green-500">{stats.totalBugs}</div>
              <div className="text-text-muted text-sm">Bugs resolved</div>
            </div>
            <div className="bg-card-bg p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-bold text-text-primary mb-2">Total Hours</h3>
              <div className="text-3xl font-bold text-blue-500">{stats.totalHours}</div>
              <div className="text-text-muted text-sm">Hours worked</div>
            </div>
            <div className="bg-card-bg p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-bold text-text-primary mb-2">Average Time</h3>
              <div className="text-3xl font-bold text-yellow-500">{stats.avgTimePerBug}h</div>
              <div className="text-text-muted text-sm">Per bug</div>
            </div>
            <div className="bg-card-bg p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-bold text-text-primary mb-2">High Priority</h3>
              <div className="text-3xl font-bold text-orange-500">{stats.priorityStats.high}</div>
              <div className="text-text-muted text-sm">Bugs completed</div>
            </div>
          </div>

          {/* Filters */}
          <div className="fade-in bg-card-bg p-6 rounded-xl border border-gray-700 mb-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Time Range</label>
                <select
                  value={filters.timeRange}
                  onChange={(e) => handleFilterChange('timeRange', e.target.value)}
                  className="w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-red"
                >
                  <option value="all">All Time</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="quarter">Last Quarter</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-red"
                >
                  <option value="all">All Status</option>
                  <option value="closed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Priority</label>
                <select
                  value={filters.priority}
                  onChange={(e) => handleFilterChange('priority', e.target.value)}
                  className="w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-red"
                >
                  <option value="all">All Priorities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Work History List */}
          <div className="fade-in space-y-4">
            {filteredHistory.map((item) => (
              <div key={item.id} className="bg-card-bg p-6 rounded-xl border border-gray-700 hover:scale-105 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-text-primary">{item.title}</h3>
                      <span className="text-text-muted text-sm">#{item.id}</span>
                    </div>
                    
                    <p className="text-text-muted text-sm mb-3">{item.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-green-600 text-white text-xs font-medium">
                        COMPLETED
                      </span>
                      <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getPriorityColor(item.priority)}`}>
                        {item.priority.toUpperCase()}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-gray-600 text-white text-xs font-medium">
                        {item.project}
                      </span>
                    </div>

                    <div className="bg-dark-bg p-4 rounded-lg mb-4">
                      <h4 className="text-sm font-medium text-text-primary mb-2">Resolution:</h4>
                      <p className="text-text-muted text-sm">{item.resolution}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-text-muted">Completed:</span>
                        <div className="text-text-primary font-medium">{item.completedAt}</div>
                      </div>
                      <div>
                        <span className="text-text-muted">Time Spent:</span>
                        <div className="text-text-primary font-medium">{item.timeSpent}</div>
                      </div>
                      <div>
                        <span className="text-text-muted">Project:</span>
                        <div className="text-text-primary font-medium">{item.project}</div>
                      </div>
                    </div>
                  </div>

                  <div className="ml-6">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl">✓</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredHistory.length === 0 && (
              <div className="text-center py-12">
                <div className="text-text-muted text-lg">No work history found matching your filters</div>
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="fade-in mt-6 text-center text-text-muted">
            Showing {filteredHistory.length} of {workHistory.length} completed tasks
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkHistoryPage;
