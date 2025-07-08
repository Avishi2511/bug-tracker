import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/common/Navbar';

const ProjectManagementPage = () => {
  const [projects, setProjects] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    status: 'active'
  });

  // Mock data
  const mockProjects = [
    {
      id: 1,
      name: 'Web Application',
      description: 'Main web application for bug tracking',
      status: 'active',
      createdAt: '2024-01-01',
      bugsCount: 15
    },
    {
      id: 2,
      name: 'Mobile Application',
      description: 'iOS and Android mobile app',
      status: 'active',
      createdAt: '2024-01-05',
      bugsCount: 8
    },
    {
      id: 3,
      name: 'API Service',
      description: 'Backend API service',
      status: 'active',
      createdAt: '2024-01-10',
      bugsCount: 5
    },
    {
      id: 4,
      name: 'Legacy System',
      description: 'Old system being phased out',
      status: 'archived',
      createdAt: '2023-12-01',
      bugsCount: 2
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProjects(mockProjects);
    }, 500);

    // Animation trigger
    const elements = document.querySelectorAll('.fade-in, .slide-in-left');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 100);
    });
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'inactive': return 'bg-yellow-600';
      case 'archived': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    const project = {
      id: projects.length + 1,
      ...newProject,
      createdAt: new Date().toISOString().split('T')[0],
      bugsCount: 0
    };
    setProjects([...projects, project]);
    setNewProject({ name: '', description: '', status: 'active' });
    setShowCreateModal(false);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project? This will also delete all associated bugs.')) {
      setProjects(projects.filter(project => project.id !== projectId));
    }
  };

  const changeProjectStatus = (projectId, newStatus) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? { ...project, status: newStatus }
        : project
    ));
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
              <button className="slide-in-left w-full text-left px-4 py-3 rounded-lg text-text-primary hover:bg-gray-700 transition-all duration-300">
                Dashboard
              </button>
              <button className="slide-in-left w-full text-left px-4 py-3 rounded-lg text-text-primary hover:bg-gray-700 transition-all duration-300">
                Bug Management
              </button>
              <button className="slide-in-left w-full text-left px-4 py-3 rounded-lg text-text-primary hover:bg-gray-700 transition-all duration-300">
                User Management
              </button>
              <button className="slide-in-left w-full text-left px-4 py-3 rounded-lg bg-accent-red text-white transition-all duration-300">
                Project Management
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Breadcrumb */}
          <div className="fade-in bg-gray-800 px-4 py-2 rounded-lg mb-6">
            <span className="text-text-muted text-sm">Home > Project Management</span>
          </div>

          {/* Page Header */}
          <div className="fade-in flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-text-primary mb-2">Project Management</h1>
              <p className="text-text-muted">Manage projects and their configurations</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105"
            >
              Create New Project
            </button>
          </div>

          {/* Projects Grid */}
          <div className="fade-in grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-card-bg p-6 rounded-xl border border-gray-700 hover:scale-105 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-text-primary">{project.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status.toUpperCase()}
                  </span>
                </div>
                
                <p className="text-text-muted mb-4 text-sm">{project.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Created:</span>
                    <span className="text-text-primary">{project.createdAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Bugs:</span>
                    <span className="text-text-primary">{project.bugsCount}</span>
                  </div>
                </div>

                <div className="flex space-x-2 mt-6">
                  <button className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-white text-xs transition-colors flex-1">
                    Edit
                  </button>
                  <div className="relative">
                    <select
                      value={project.status}
                      onChange={(e) => changeProjectStatus(project.id, e.target.value)}
                      className="bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded text-white text-xs transition-colors appearance-none pr-8"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-white text-xs transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Projects Table */}
          <div className="fade-in bg-card-bg rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-4 bg-gray-800">
              <h3 className="text-lg font-bold text-text-primary">All Projects</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Description</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Bugs</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Created</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-800 transition-colors">
                      <td className="px-6 py-4 text-sm text-text-primary">#{project.id}</td>
                      <td className="px-6 py-4 text-sm text-text-primary font-medium">{project.name}</td>
                      <td className="px-6 py-4 text-sm text-text-muted">{project.description}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-text-primary">{project.bugsCount}</td>
                      <td className="px-6 py-4 text-sm text-text-muted">{project.createdAt}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-xs transition-colors">
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-xs transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Results Summary */}
          <div className="fade-in mt-4 text-center text-text-muted">
            Total Projects: {projects.length}
          </div>
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card-bg rounded-xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-text-primary">Create New Project</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-text-muted hover:text-text-primary text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Project Name</label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  className="w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-red"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-red resize-vertical"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Status</label>
                <select
                  value={newProject.status}
                  onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                  className="w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-red"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg text-white transition-colors"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManagementPage;