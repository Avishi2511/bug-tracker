import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/common/Navbar';

const MyBugsPage = () => {
  const navigate = useNavigate();
  const [bugs, setBugs] = useState([]);
  const [filteredBugs, setFilteredBugs] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    project: 'all'
  });
  const [selectedBug, setSelectedBug] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleNavigation = (tab) => {
    switch (tab) {
      case 'dashboard':
        navigate('/tester');
        break;
      case 'report':
        navigate('/tester/report');
        break;
      case 'bugs':
        navigate('/tester/bugs');
        break;
      default:
        break;
    }
  };

  // Mock data for bugs reported by current tester
  const mockBugs = [
    {
      id: 1,
      title: 'Search functionality not working',
      description: 'The search bar does not return any results when typing',
      status: 'open',
      priority: 'high',
      project: 'Web Application',
      assignedTo: 'John Developer',
      createdAt: '2024-01-16',
      updatedAt: '2024-01-16'
    },
    {
      id: 2,
      title: 'Button alignment issue on mobile',
      description: 'Submit button is misaligned on mobile devices',
      status: 'in-progress',
      priority: 'medium',
      project: 'Web Application',
      assignedTo: 'Mike Developer',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-16'
    },
    {
      id: 3,
      title: 'Form validation error message',
      description: 'Error message appears even when form is filled correctly',
      status: 'closed',
      priority: 'low',
      project: 'Web Application',
      assignedTo: 'John Developer',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-15'
    },
    {
      id: 4,
      title: 'Dashboard loading timeout',
      description: 'Dashboard takes more than 30 seconds to load',
      status: 'in-progress',
      priority: 'critical',
      project: 'Web Application',
      assignedTo: 'Sarah Developer',
      createdAt: '2024-01-13',
      updatedAt: '2024-01-16'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBugs(mockBugs);
      setFilteredBugs(mockBugs);
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
    let filtered = bugs;

    if (filters.status !== 'all') {
      filtered = filtered.filter(bug => bug.status === filters.status);
    }

    if (filters.priority !== 'all') {
      filtered = filtered.filter(bug => bug.priority === filters.priority);
    }

    if (filters.project !== 'all') {
      filtered = filtered.filter(bug => bug.project === filters.project);
    }

    setFilteredBugs(filtered);
  }, [filters, bugs]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-red-600';
      case 'in-progress': return 'bg-yellow-600';
      case 'closed': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
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

  const handleViewBug = (bug) => {
    setSelectedBug(bug);
    setShowModal(true);
  };

  const getStatusStats = () => {
    const stats = {
      open: bugs.filter(bug => bug.status === 'open').length,
      inProgress: bugs.filter(bug => bug.status === 'in-progress').length,
      closed: bugs.filter(bug => bug.status === 'closed').length
    };
    return stats;
  };

  const stats = getStatusStats();

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
                onClick={() => handleNavigation('report')}
                className="slide-in-left w-full text-left px-4 py-3 rounded-lg text-text-primary hover:bg-gray-700 transition-all duration-300"
              >
                Report Bug
              </button>
              <button className="slide-in-left w-full text-left px-4 py-3 rounded-lg bg-accent-red text-white transition-all duration-300">
                My Bugs
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Breadcrumb */}
          <div className="fade-in bg-gray-800 px-4 py-2 rounded-lg mb-6">
            <span className="text-text-muted text-sm">Home &gt; My Bugs</span>
          </div>

          {/* Page Header */}
          <div className="fade-in mb-6">
            <h1 className="text-2xl font-bold text-text-primary mb-2">My Bug Reports</h1>
            <p className="text-text-muted">Track the status of bugs you've reported</p>
          </div>

          {/* Statistics Cards */}
          <div className="fade-in grid md:grid-cols-4 gap-6 mb-6">
            <div className="bg-card-bg p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-bold text-text-primary mb-2">Total Bugs</h3>
              <div className="text-3xl font-bold text-accent-red">{bugs.length}</div>
            </div>
            <div className="bg-card-bg p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-bold text-text-primary mb-2">Open</h3>
              <div className="text-3xl font-bold text-red-500">{stats.open}</div>
            </div>
            <div className="bg-card-bg p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-bold text-text-primary mb-2">In Progress</h3>
              <div className="text-3xl font-bold text-yellow-500">{stats.inProgress}</div>
            </div>
            <div className="bg-card-bg p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-bold text-text-primary mb-2">Closed</h3>
              <div className="text-3xl font-bold text-green-500">{stats.closed}</div>
            </div>
          </div>

          {/* Filters */}
          <div className="fade-in bg-card-bg p-6 rounded-xl border border-gray-700 mb-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-red"
                >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="closed">Closed</option>
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

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Project</label>
                <select
                  value={filters.project}
                  onChange={(e) => handleFilterChange('project', e.target.value)}
                  className="w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-red"
                >
                  <option value="all">All Projects</option>
                  <option value="Web Application">Web Application</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="API Service">API Service</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bugs List */}
          <div className="fade-in space-y-4">
            {filteredBugs.map((bug) => (
              <div key={bug.id} className="bg-card-bg p-6 rounded-xl border border-gray-700 hover:scale-105 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-text-primary mb-2">{bug.title}</h3>
                    <p className="text-text-muted text-sm mb-3">{bug.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getStatusColor(bug.status)}`}>
                        {bug.status.replace('-', ' ').toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getPriorityColor(bug.priority)}`}>
                        {bug.priority.toUpperCase()}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-gray-600 text-white text-xs font-medium">
                        {bug.project}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-text-muted">Assigned to:</span>
                        <div className="text-text-primary font-medium">{bug.assignedTo}</div>
                      </div>
                      <div>
                        <span className="text-text-muted">Created:</span>
                        <div className="text-text-primary">{bug.createdAt}</div>
                      </div>
                      <div>
                        <span className="text-text-muted">Last Updated:</span>
                        <div className="text-text-primary">{bug.updatedAt}</div>
                      </div>
                    </div>
                  </div>

                  <div className="ml-6">
                    <button
                      onClick={() => handleViewBug(bug)}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredBugs.length === 0 && (
              <div className="text-center py-12">
                <div className="text-text-muted text-lg">No bugs found matching your filters</div>
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="fade-in mt-6 text-center text-text-muted">
            Showing {filteredBugs.length} of {bugs.length} bugs
          </div>
        </div>
      </div>

      {/* Bug Detail Modal */}
      {showModal && selectedBug && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card-bg rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold text-text-primary">Bug Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-text-muted hover:text-text-primary text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Title</label>
                <p className="text-text-muted">{selectedBug.title}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Description</label>
                <p className="text-text-muted">{selectedBug.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Status</label>
                  <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getStatusColor(selectedBug.status)}`}>
                    {selectedBug.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Priority</label>
                  <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getPriorityColor(selectedBug.priority)}`}>
                    {selectedBug.priority.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Project</label>
                  <p className="text-text-muted">{selectedBug.project}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Assigned To</label>
                  <p className="text-text-muted">{selectedBug.assignedTo}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Created</label>
                  <p className="text-text-muted">{selectedBug.createdAt}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Last Updated</label>
                  <p className="text-text-muted">{selectedBug.updatedAt}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBugsPage;
