import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/common/Navbar';
import * as api from '../../../utils/api';
import { useAuth } from '../../../contexts/AuthContext';

const BugManagementPage = () => {
  const { user } = useAuth();
  const [bugs, setBugs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [filteredBugs, setFilteredBugs] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    project: 'all',
    search: ''
  });
  const [selectedBug, setSelectedBug] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [assigningBug, setAssigningBug] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch bugs, projects, and users in parallel
        const [bugsResponse, projectsResponse, usersResponse] = await Promise.all([
          api.getBugs(),
          api.getProjects(),
          api.getUsers()
        ]);

        console.log('Bug Management API responses:', {
          bugs: bugsResponse.data,
          projects: projectsResponse.data,
          users: usersResponse.data
        });

        // Process bugs data
        if (bugsResponse.data.success) {
          const bugsData = bugsResponse.data.data.bugs || bugsResponse.data.data || [];
          setBugs(Array.isArray(bugsData) ? bugsData : []);
        }

        // Process projects data
        if (projectsResponse.data.success) {
          const projectsData = projectsResponse.data.data.projects || projectsResponse.data.data || [];
          setProjects(Array.isArray(projectsData) ? projectsData : []);
        }

        // Process users data and filter for developers
        if (usersResponse.data.success) {
          const usersData = usersResponse.data.data || [];
          const developersData = Array.isArray(usersData) ? usersData.filter(user => user.role === 'developer') : [];
          setDevelopers(developersData);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        setBugs([]);
        setProjects([]);
        setDevelopers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

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
      filtered = filtered.filter(bug => {
        // Handle both cases: bug.project as object or string
        const projectId = typeof bug.project === 'object' ? bug.project._id : bug.project;
        return projectId === filters.project;
      });
    }

    if (filters.search) {
      filtered = filtered.filter(bug => 
        bug.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        bug.description.toLowerCase().includes(filters.search.toLowerCase())
      );
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

  const handleDeleteBug = (bugId) => {
    if (window.confirm('Are you sure you want to delete this bug?')) {
      setBugs(prev => prev.filter(bug => bug._id !== bugId));
    }
  };

  const handleAssignBug = async (bugId, developerId) => {
    setAssigningBug(bugId);
    try {
      const response = await api.assignBug(bugId, developerId);
      
      if (response.data.success) {
        // Update the bug in the local state
        setBugs(prev => prev.map(bug => 
          bug._id === bugId 
            ? { ...bug, assignedTo: response.data.data.bug.assignedTo }
            : bug
        ));
      }
    } catch (error) {
      console.error('Error assigning bug:', error);
      alert('Failed to assign bug. Please try again.');
    } finally {
      setAssigningBug(null);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-card-bg min-h-screen border-r border-gray-700">
          <div className="p-6">
            <h2 className="text-lg font-bold text-text-primary mb-6">Navigation</h2>
            <nav className="space-y-2">
              <Link
                to="/admin"
                className="slide-in-left block w-full text-left px-4 py-3 rounded-lg text-text-primary hover:bg-gray-700 transition-all duration-300"
              >
                Dashboard
              </Link>
              <Link
                to="/admin/bugs"
                className="slide-in-left block w-full text-left px-4 py-3 rounded-lg bg-accent-red text-white transition-all duration-300"
              >
                Bug Management
              </Link>
              <Link
                to="/admin/users"
                className="slide-in-left block w-full text-left px-4 py-3 rounded-lg text-text-primary hover:bg-gray-700 transition-all duration-300"
              >
                User Management
              </Link>
              <Link
                to="/admin/projects"
                className="slide-in-left block w-full text-left px-4 py-3 rounded-lg text-text-primary hover:bg-gray-700 transition-all duration-300"
              >
                Project Management
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Breadcrumb */}
          <div className="fade-in bg-gray-800 px-4 py-2 rounded-lg mb-6">
            <span className="text-text-muted text-sm">Home &gt; Bug Management</span>
          </div>

          {/* Page Header */}
          <div className="fade-in mb-6">
            <h1 className="text-2xl font-bold text-text-primary mb-2">Bug Management</h1>
            <p className="text-text-muted">View and manage all bugs in the system</p>
          </div>

          {/* Filters */}
          <div className="fade-in bg-card-bg p-6 rounded-xl border border-gray-700 mb-6">
            <div className="grid md:grid-cols-4 gap-4 mb-4">
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
                  {projects.map(project => (
                    <option key={project._id} value={project._id}>{project.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Search</label>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Search bugs..."
                  className="w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-red"
                />
              </div>
            </div>
          </div>

          {/* Bugs Table */}
          <div className="fade-in bg-card-bg rounded-xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Priority</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Assigned To</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Created</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-8 text-center text-text-muted">
                        Loading bugs...
                      </td>
                    </tr>
                  ) : filteredBugs.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-8 text-center text-text-muted">
                        No bugs found. {bugs.length === 0 ? 'No bugs have been reported yet.' : 'Try adjusting your filters.'}
                      </td>
                    </tr>
                  ) : (
                    filteredBugs.map((bug) => (
                      <tr key={bug._id} className="hover:bg-gray-800 transition-colors">
                        <td className="px-6 py-4 text-sm text-text-primary">#{bug._id.slice(-6)}</td>
                        <td className="px-6 py-4 text-sm text-text-primary font-medium">{bug.title}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getStatusColor(bug.status)}`}>
                            {bug.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getPriorityColor(bug.priority)}`}>
                            {bug.priority.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-text-muted">
                          {bug.assignedTo ? `${bug.assignedTo.firstName} ${bug.assignedTo.lastName}` : 'Unassigned'}
                        </td>
                        <td className="px-6 py-4 text-sm text-text-muted">{new Date(bug.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleViewBug(bug)}
                              className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-xs transition-colors"
                            >
                              View
                            </button>
                            <div className="relative">
                              <select
                                value={bug.assignedTo?._id || ''}
                                onChange={(e) => handleAssignBug(bug._id, e.target.value)}
                                disabled={assigningBug === bug._id}
                                className="bg-green-600 hover:bg-green-700 disabled:opacity-50 px-3 py-1 rounded text-white text-xs transition-colors appearance-none pr-6 min-w-[80px]"
                              >
                                <option value="">Assign...</option>
                                {developers.map(developer => (
                                  <option key={developer._id} value={developer._id}>
                                    {developer.firstName} {developer.lastName}
                                  </option>
                                ))}
                              </select>
                              {assigningBug === bug._id && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => handleDeleteBug(bug._id)}
                              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-xs transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Results Summary */}
          <div className="fade-in mt-4 text-center text-text-muted">
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
                  <label className="block text-sm font-medium text-text-primary mb-1">Assigned To</label>
                  <p className="text-text-muted">{selectedBug.assignedToName}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Reported By</label>
                  <p className="text-text-muted">{selectedBug.reportedByName}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Created</label>
                  <p className="text-text-muted">{new Date(selectedBug.createdAt).toLocaleString()}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Last Updated</label>
                  <p className="text-text-muted">{new Date(selectedBug.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg text-white transition-colors"
              >
                Close
              </button>
              <button className="bg-accent-red hover:bg-accent-coral px-6 py-2 rounded-lg text-white transition-colors">
                Edit Bug
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BugManagementPage;
