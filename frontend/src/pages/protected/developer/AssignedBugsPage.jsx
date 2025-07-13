import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/common/Navbar';
import { getBugsByAssignee } from '../../../data/mockBugs';
import { mockProjects } from '../../../data/mockProjects';
import { mockUsers } from '../../../data/mockUsers';

const AssignedBugsPage = () => {
  const navigate = useNavigate();
  const [bugs, setBugs] = useState([]);
  const [filteredBugs, setFilteredBugs] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all'
  });
  const [selectedBug, setSelectedBug] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [progressNotes, setProgressNotes] = useState('');

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

  useEffect(() => {
    // Data fetching logic will go here
    // For now, we'll just initialize with empty arrays

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

    // Sort by priority: critical > high > medium > low
    const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
    filtered.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);

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

  const getPriorityBorderColor = (priority) => {
    switch (priority) {
      case 'critical': return 'border-l-red-500';
      case 'high': return 'border-l-orange-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-blue-500';
      default: return 'border-l-gray-500';
    }
  };

  const handleViewBug = (bug) => {
    setSelectedBug(bug);
    setNewStatus(bug.status);
    setProgressNotes('');
    setShowModal(true);
  };

  const handleUpdateStatus = () => {
    if (selectedBug && newStatus !== selectedBug.status) {
      setBugs(bugs.map(bug => 
        bug.id === selectedBug.id 
          ? { ...bug, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
          : bug
      ));
      setShowModal(false);
      // In real app, this would make an API call
    }
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
              <button className="slide-in-left w-full text-left px-4 py-3 rounded-lg bg-accent-red text-white transition-all duration-300">
                Assigned Bugs
              </button>
              <button 
                onClick={() => handleNavigation('history')}
                className="slide-in-left w-full text-left px-4 py-3 rounded-lg text-text-primary hover:bg-gray-700 transition-all duration-300"
              >
                Work History
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Breadcrumb */}
          <div className="fade-in bg-gray-800 px-4 py-2 rounded-lg mb-6">
            <span className="text-text-muted text-sm">Home &gt; Assigned Bugs</span>
          </div>

          {/* Page Header */}
          <div className="fade-in mb-6">
            <h1 className="text-2xl font-bold text-text-primary mb-2">Assigned Bugs</h1>
            <p className="text-text-muted">Manage bugs assigned to you, sorted by priority</p>
          </div>

          {/* Statistics Cards */}
          <div className="fade-in grid md:grid-cols-4 gap-6 mb-6">
            <div className="bg-card-bg p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-bold text-text-primary mb-2">Total Assigned</h3>
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
              <h3 className="text-lg font-bold text-text-primary mb-2">Completed</h3>
              <div className="text-3xl font-bold text-green-500">{stats.closed}</div>
            </div>
          </div>

          {/* Filters */}
          <div className="fade-in bg-card-bg p-6 rounded-xl border border-gray-700 mb-6">
            <div className="grid md:grid-cols-2 gap-4">
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
            </div>
          </div>

          {/* Priority Badges */}
          <div className="fade-in flex flex-wrap gap-4 mb-6">
            <div className="bg-red-600 px-4 py-2 rounded-lg text-white font-semibold">
              Critical Priority
            </div>
            <div className="bg-orange-600 px-4 py-2 rounded-lg text-white font-semibold">
              High Priority
            </div>
            <div className="bg-yellow-600 px-4 py-2 rounded-lg text-white font-semibold">
              Medium Priority
            </div>
            <div className="bg-blue-600 px-4 py-2 rounded-lg text-white font-semibold">
              Low Priority
            </div>
          </div>

          {/* Bugs List */}
          <div className="fade-in space-y-4">
            {filteredBugs.map((bug) => (
              <div key={bug.id} className={`bg-card-bg p-6 rounded-xl border-l-4 ${getPriorityBorderColor(bug.priority)} border-r border-t border-b border-gray-700 hover:scale-105 transition-all duration-300`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-bold text-text-primary">{bug.title}</h3>
                      <span className="text-text-muted text-sm">#{bug._id.slice(-6)}</span>
                    </div>
                    
                    <p className="text-text-muted text-sm mb-4">{bug.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getStatusColor(bug.status)}`}>
                        {bug.status.replace('-', ' ').toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getPriorityColor(bug.priority)}`}>
                        {bug.priority.toUpperCase()}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-gray-600 text-white text-xs font-medium">
                        {bug.projectName}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-text-muted">Reported by:</span>
                        <div className="text-text-primary font-medium">{bug.reportedByName}</div>
                      </div>
                      <div>
                        <span className="text-text-muted">Created:</span>
                        <div className="text-text-primary">{new Date(bug.createdAt).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <span className="text-text-muted">Last Updated:</span>
                        <div className="text-text-primary">{new Date(bug.updatedAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>

                  <div className="ml-6 flex flex-col gap-2">
                    <button
                      onClick={() => handleViewBug(bug)}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105"
                    >
                      View Details
                    </button>
                    
                    {bug.status !== 'closed' && (
                      <button
                        onClick={() => handleViewBug(bug)}
                        className="bg-accent-red hover:bg-accent-coral px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105"
                      >
                        Update Status
                      </button>
                    )}
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
            Showing {filteredBugs.length} of {bugs.length} assigned bugs
          </div>
        </div>
      </div>

      {/* Bug Detail Modal */}
      {showModal && selectedBug && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card-bg rounded-xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold text-text-primary">Bug Details & Status Update</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-text-muted hover:text-text-primary text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Bug Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Title</label>
                  <p className="text-text-muted">{selectedBug.title}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Description</label>
                  <p className="text-text-muted">{selectedBug.description}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Steps to Reproduce</label>
                  <pre className="text-text-muted text-sm whitespace-pre-wrap bg-dark-bg p-3 rounded">{selectedBug.stepsToReproduce}</pre>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Expected Behavior</label>
                    <p className="text-text-muted text-sm">{selectedBug.expectedBehavior}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Actual Behavior</label>
                    <p className="text-text-muted text-sm">{selectedBug.actualBehavior}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Environment</label>
                    <p className="text-text-muted">{selectedBug.environment}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Browser/Version</label>
                    <p className="text-text-muted">{selectedBug.browserVersion}</p>
                  </div>
                </div>
              </div>

              {/* Status Update */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Current Status</label>
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

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Update Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-red"
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Progress Notes (Optional)</label>
                  <textarea
                    value={progressNotes}
                    onChange={(e) => setProgressNotes(e.target.value)}
                    rows={4}
                    placeholder="Add notes about your progress on this bug..."
                    className="w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-red resize-vertical"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Reported By</label>
                  <p className="text-text-muted">{selectedBug.reportedByName}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Created</label>
                  <p className="text-text-muted">{new Date(selectedBug.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStatus}
                className="bg-accent-red hover:bg-accent-coral px-6 py-2 rounded-lg text-white transition-colors"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedBugsPage;
