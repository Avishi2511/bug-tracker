import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/common/Navbar';
import * as api from '../../../utils/api';

const ReportBugPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    project: '',
    title: '',
    description: '',
    stepsToReproduce: '',
    expectedBehavior: '',
    actualBehavior: '',
    priority: 'medium',
    environment: '',
    browserVersion: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bugId, setBugId] = useState('');
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

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

  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const response = await api.getProjects();
      console.log('Projects API response:', response.data); // Debug log
      
      if (response.data.success) {
        // The projects are nested in response.data.data.projects
        const allProjects = response.data.data.projects || response.data.data || [];
        // Filter for active projects only
        const activeProjects = allProjects.filter(p => p.status === 'active');
        setProjects(activeProjects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleRefreshProjects = () => {
    fetchProjects();
  };

  const priorities = [
    { value: 'low', label: 'Low', color: 'bg-blue-600' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-600' },
    { value: 'high', label: 'High', color: 'bg-orange-600' },
    { value: 'critical', label: 'Critical', color: 'bg-red-600' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.project) {
      newErrors.project = 'Please select a project';
    }
    
    if (!formData.title.trim()) {
      newErrors.title = 'Bug title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Bug description is required';
    }

    if (!formData.stepsToReproduce.trim()) {
      newErrors.stepsToReproduce = 'Steps to reproduce are required';
    }

    if (!formData.expectedBehavior.trim()) {
      newErrors.expectedBehavior = 'Expected behavior is required';
    }

    if (!formData.actualBehavior.trim()) {
      newErrors.actualBehavior = 'Actual behavior is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    try {
      const bugData = {
        title: formData.title,
        description: formData.description,
        stepsToReproduce: formData.stepsToReproduce,
        expectedBehavior: formData.expectedBehavior,
        actualBehavior: formData.actualBehavior,
        priority: formData.priority,
        project: formData.project,
        environment: formData.environment,
        browserVersion: formData.browserVersion
      };

      const response = await api.createBug(bugData);
      
      if (response.data.success) {
        setBugId(response.data.data.bug._id || response.data.data.bug.id);
        setIsSubmitted(true);
      } else {
        setErrors({ submit: response.data.message || 'Failed to submit bug report. Please try again.' });
      }
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Failed to submit bug report. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReportAnother = () => {
    setIsSubmitted(false);
    setBugId('');
    setFormData({
      project: '',
      title: '',
      description: '',
      stepsToReproduce: '',
      expectedBehavior: '',
      actualBehavior: '',
      priority: 'medium',
      environment: '',
      browserVersion: ''
    });
    setErrors({});
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
                className="w-full text-left px-4 py-3 rounded-lg text-text-primary hover:bg-gray-700 transition-all duration-300"
              >
                Dashboard
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg bg-accent-red text-white transition-all duration-300">
                Report Bug
              </button>
              <button 
                onClick={() => handleNavigation('bugs')}
                className="w-full text-left px-4 py-3 rounded-lg text-text-primary hover:bg-gray-700 transition-all duration-300"
              >
                My Bugs
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Breadcrumb */}
          <div className="bg-gray-800 px-4 py-2 rounded-lg mb-6">
            <span className="text-text-muted text-sm">Home &gt; Report Bug</span>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-card-bg rounded-xl p-8 shadow-2xl">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-text-primary mb-2">Report a Bug</h1>
                <p className="text-text-muted">Provide detailed information about the bug you encountered</p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Project and Title Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="project" className="block text-sm font-medium text-text-primary">
                          Project <span className="text-accent-red">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={handleRefreshProjects}
                          disabled={loadingProjects}
                          className="text-xs text-blue-400 hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                        >
                          {loadingProjects ? (
                            <>
                              <div className="w-3 h-3 border border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                              Refreshing...
                            </>
                          ) : (
                            <>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                              Refresh Projects
                            </>
                          )}
                        </button>
                      </div>
                      <select
                        id="project"
                        name="project"
                        value={formData.project}
                        onChange={handleChange}
                        disabled={loadingProjects}
                        className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                          errors.project ? 'border-accent-red' : 'border-gray-600'
                        }`}
                      >
                        <option value="">
                          {loadingProjects ? 'Loading projects...' : 'Select a project...'}
                        </option>
                        {projects.map(project => (
                          <option key={project._id} value={project._id}>
                            {project.name}
                          </option>
                        ))}
                      </select>
                      {errors.project && (
                        <p className="mt-1 text-sm text-accent-red">{errors.project}</p>
                      )}
                      {projects.length === 0 && !loadingProjects && (
                        <p className="mt-1 text-sm text-yellow-500">
                          No active projects found. Contact an admin to create projects.
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-text-primary mb-2">
                        Bug Title <span className="text-accent-red">*</span>
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Brief description of the bug"
                        className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all ${
                          errors.title ? 'border-accent-red' : 'border-gray-600'
                        }`}
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-accent-red">{errors.title}</p>
                      )}
                    </div>
                  </div>

                  {/* Bug Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-text-primary mb-2">
                      Bug Description <span className="text-accent-red">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Detailed description of the bug..."
                      className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all resize-vertical ${
                        errors.description ? 'border-accent-red' : 'border-gray-600'
                      }`}
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-accent-red">{errors.description}</p>
                    )}
                  </div>

                  {/* Steps to Reproduce */}
                  <div>
                    <label htmlFor="stepsToReproduce" className="block text-sm font-medium text-text-primary mb-2">
                      Steps to Reproduce <span className="text-accent-red">*</span>
                    </label>
                    <textarea
                      id="stepsToReproduce"
                      name="stepsToReproduce"
                      value={formData.stepsToReproduce}
                      onChange={handleChange}
                      rows={4}
                      placeholder="1. Go to...&#10;2. Click on...&#10;3. Enter...&#10;4. Observe..."
                      className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all resize-vertical ${
                        errors.stepsToReproduce ? 'border-accent-red' : 'border-gray-600'
                      }`}
                    />
                    {errors.stepsToReproduce && (
                      <p className="mt-1 text-sm text-accent-red">{errors.stepsToReproduce}</p>
                    )}
                  </div>

                  {/* Expected vs Actual Behavior */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="expectedBehavior" className="block text-sm font-medium text-text-primary mb-2">
                        Expected Behavior <span className="text-accent-red">*</span>
                      </label>
                      <textarea
                        id="expectedBehavior"
                        name="expectedBehavior"
                        value={formData.expectedBehavior}
                        onChange={handleChange}
                        rows={3}
                        placeholder="What should happen..."
                        className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all resize-vertical ${
                          errors.expectedBehavior ? 'border-accent-red' : 'border-gray-600'
                        }`}
                      />
                      {errors.expectedBehavior && (
                        <p className="mt-1 text-sm text-accent-red">{errors.expectedBehavior}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="actualBehavior" className="block text-sm font-medium text-text-primary mb-2">
                        Actual Behavior <span className="text-accent-red">*</span>
                      </label>
                      <textarea
                        id="actualBehavior"
                        name="actualBehavior"
                        value={formData.actualBehavior}
                        onChange={handleChange}
                        rows={3}
                        placeholder="What actually happens..."
                        className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all resize-vertical ${
                          errors.actualBehavior ? 'border-accent-red' : 'border-gray-600'
                        }`}
                      />
                      {errors.actualBehavior && (
                        <p className="mt-1 text-sm text-accent-red">{errors.actualBehavior}</p>
                      )}
                    </div>
                  </div>

                  {/* Priority Selection */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-4">Priority Level</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {priorities.map(priority => (
                        <label
                          key={priority.value}
                          className={`cursor-pointer p-3 rounded-lg border-2 transition-all ${
                            formData.priority === priority.value
                              ? 'border-accent-red bg-accent-red/10'
                              : 'border-gray-600 hover:border-gray-500'
                          }`}
                        >
                          <input
                            type="radio"
                            name="priority"
                            value={priority.value}
                            checked={formData.priority === priority.value}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className="text-center">
                            <div className={`w-4 h-4 ${priority.color} rounded-full mx-auto mb-2`}></div>
                            <span className="text-text-primary text-sm font-medium">{priority.label}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Environment Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="environment" className="block text-sm font-medium text-text-primary mb-2">
                        Environment (Optional)
                      </label>
                      <input
                        type="text"
                        id="environment"
                        name="environment"
                        value={formData.environment}
                        onChange={handleChange}
                        placeholder="e.g., Production, Staging, Development"
                        className="w-full px-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="browserVersion" className="block text-sm font-medium text-text-primary mb-2">
                        Browser/Version (Optional)
                      </label>
                      <input
                        type="text"
                        id="browserVersion"
                        name="browserVersion"
                        value={formData.browserVersion}
                        onChange={handleChange}
                        placeholder="e.g., Chrome 120.0, Firefox 121.0"
                        className="w-full px-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Submit Error */}
                  {errors.submit && (
                    <div className="p-3 bg-accent-red/10 border border-accent-red rounded-lg">
                      <p className="text-sm text-accent-red">{errors.submit}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-accent-red hover:bg-accent-coral disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="spinner mr-2"></div>
                        Submitting Bug Report...
                      </div>
                    ) : (
                      'Submit Bug Report'
                    )}
                  </button>
                </form>
              ) : (
                /* Success Confirmation */
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-2xl">✓</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-text-primary mb-4">
                    Bug Report Submitted Successfully!
                  </h2>
                  
                  <p className="text-text-muted mb-6">
                    Your bug report has been received and assigned ID:
                  </p>
                  
                  <div className="bg-dark-bg p-4 rounded-lg mb-6">
                    <span className="text-accent-red font-mono text-lg">{bugId}</span>
                  </div>
                  
                  <p className="text-text-muted mb-8">
                    The development team will review your report and assign it to a developer soon.
                  </p>
                  
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={handleReportAnother}
                      className="bg-accent-red hover:bg-accent-coral text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      Report Another Bug
                    </button>
                    
                    <button 
                      onClick={() => handleNavigation('bugs')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      View My Bugs
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportBugPage;
