import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/common/Navbar';
import * as api from '../../../utils/api';
import { useAuth } from '../../../contexts/AuthContext';

const ProjectManagementPage = () => {
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    status: 'active'
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleNavigation = (tab) => {
    switch (tab) {
      case 'dashboard':
        navigate('/admin');
        break;
      case 'bugs':
        navigate('/admin/bugs');
        break;
      case 'users':
        navigate('/admin/users');
        break;
      case 'projects':
        navigate('/admin/projects');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.getProjects();
        console.log('Projects API response:', response.data); // Debug log
        
        if (response.data.success) {
          // The projects are nested in response.data.data.projects
          const projectsData = response.data.data.projects || response.data.data || [];
          // Ensure we always set an array
          setProjects(Array.isArray(projectsData) ? projectsData : []);
        } else {
          setProjects([]);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setErrors({ fetch: 'Failed to load projects' });
        setProjects([]); // Ensure projects is always an array
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

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

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setErrors({});
    
    try {
      const response = await api.createProject(newProject);
      
      if (response.data.success) {
        setProjects([...projects, response.data.data.project]);
        setSuccessMessage('Project created successfully!');
        setNewProject({ name: '', description: '', status: 'active' });
        setShowCreateModal(false);
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      setErrors({ 
        submit: error.response?.data?.message || 'Failed to create project. Please try again.' 
      });
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project? This will also delete all associated bugs.')) {
      try {
        await api.deleteProject(projectId);
        setProjects(projects.filter(project => project._id !== projectId));
        setSuccessMessage('Project deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        setErrors({ 
          delete: error.response?.data?.message || 'Failed to delete project. Please try again.' 
        });
      }
    }
  };

  const changeProjectStatus = async (projectId, newStatus) => {
    try {
      await api.updateProject(projectId, { status: newStatus });
      
      setProjects(projects.map(project => 
        project._id === projectId 
          ? { ...project, status: newStatus }
          : project
      ));
      setSuccessMessage(`Project status updated to ${newStatus}!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrors({ 
        update: error.response?.data?.message || 'Failed to update project status. Please try again.' 
      });
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
              <button 
                onClick={() => handleNavigation('dashboard')}
                className="slide-in-left w-full text-left px-4 py-3 rounded-lg text-text-primary hover:bg-gray-700 transition-all duration-300"
              >
                Dashboard
              </button>
              <button 
                onClick={() => handleNavigation('bugs')}
                className="slide-in-left w-full text-left px-4 py-3 rounded-lg text-text-primary hover:bg-gray-700 transition-all duration-300"
              >
                Bug Management
              </button>
              <button 
                onClick={() => handleNavigation('users')}
                className="slide-in-left w-full text-left px-4 py-3 rounded-lg text-text-primary hover:bg-gray-700 transition-all duration-300"
              >
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
            <span className="text-text-muted text-sm">Home &gt; Project Management</span>
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

          {/* Success/Error Messages */}
          {successMessage && (
            <div className="fade-in mb-6 p-4 bg-green-600/10 border border-green-600 rounded-lg">
              <p className="text-green-600">{successMessage}</p>
            </div>
          )}
          
          {(errors.fetch || errors.delete || errors.update) && (
            <div className="fade-in mb-6 p-4 bg-red-600/10 border border-red-600 rounded-lg">
              <p className="text-red-600">{errors.fetch || errors.delete || errors.update}</p>
            </div>
          )}

          {/* Projects Grid */}
          <div className="fade-in grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {loading ? (
              <div className="col-span-full text-center py-8 text-text-muted">
                Loading projects...
              </div>
            ) : !Array.isArray(projects) || projects.length === 0 ? (
              <div className="col-span-full text-center py-8 text-text-muted">
                No projects found. Create your first project to get started.
              </div>
            ) : (
              projects.map((project) => (
                <div key={project._id} className="bg-card-bg p-6 rounded-xl border border-gray-700 hover:scale-105 transition-all duration-300">
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
                      <span className="text-text-primary">{new Date(project.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Bugs:</span>
                      <span className="text-text-primary">{project.bugsCount || 0}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-6">
                    <button className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-white text-xs transition-colors flex-1">
                      Edit
                    </button>
                    <div className="relative">
                      <select
                        value={project.status}
                        onChange={(e) => changeProjectStatus(project._id, e.target.value)}
                        className="bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded text-white text-xs transition-colors appearance-none pr-8"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                    <button
                      onClick={() => handleDeleteProject(project._id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-white text-xs transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
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
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-8 text-center text-text-muted">
                        Loading projects...
                      </td>
                    </tr>
                  ) : projects.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-8 text-center text-text-muted">
                        No projects found. Create your first project to get started.
                      </td>
                    </tr>
                  ) : (
                    projects.map((project) => (
                      <tr key={project._id} className="hover:bg-gray-800 transition-colors">
                        <td className="px-6 py-4 text-sm text-text-primary">#{project._id.slice(-6)}</td>
                        <td className="px-6 py-4 text-sm text-text-primary font-medium">{project.name}</td>
                        <td className="px-6 py-4 text-sm text-text-muted">{project.description}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getStatusColor(project.status)}`}>
                            {project.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-text-primary">{project.bugsCount || 0}</td>
                        <td className="px-6 py-4 text-sm text-text-muted">{new Date(project.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-xs transition-colors">
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project._id)}
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

              {errors.submit && (
                <div className="p-3 bg-red-600/10 border border-red-600 rounded-lg">
                  <p className="text-sm text-red-600">{errors.submit}</p>
                </div>
              )}

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
