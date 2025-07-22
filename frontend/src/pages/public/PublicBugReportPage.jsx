import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPublicProjects, reportBugPublic } from '../../utils/api';

const PublicBugReportPage = () => {
  const [formData, setFormData] = useState({
    project: '',
    title: '',
    description: '',
    priority: 'medium',
    reporterName: '',
    reporterEmail: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bugId, setBugId] = useState('');
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  const priorities = [
    { value: 'low', label: 'Low', color: 'bg-blue-600', borderColor: 'border-blue-600' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-600', borderColor: 'border-yellow-600' },
    { value: 'high', label: 'High', color: 'bg-orange-600', borderColor: 'border-orange-600' },
    { value: 'critical', label: 'Critical', color: 'bg-accent-red', borderColor: 'border-accent-red' }
  ];

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setProjectsLoading(true);
        const response = await getPublicProjects();
        if (response.data.success) {
          setProjects(response.data.data.projects);
        } else {
          setErrors(prev => ({ ...prev, projects: 'Failed to load projects' }));
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setErrors(prev => ({ ...prev, projects: 'Failed to load projects' }));
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
    
    if (formData.reporterEmail && !/\S+@\S+\.\S+/.test(formData.reporterEmail)) {
      newErrors.reporterEmail = 'Please enter a valid email';
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
      // Prepare bug data for submission
      const bugData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        project: formData.project,
        reporterName: formData.reporterName.trim() || undefined,
        reporterEmail: formData.reporterEmail.trim() || undefined
      };

      const response = await reportBugPublic(bugData);
      
      if (response.data.success) {
        // Use the actual bug ID from the response
        setBugId(`#${response.data.data.bug.id}`);
        setIsSubmitted(true);
      } else {
        setErrors({ submit: response.data.message || 'Failed to submit bug report. Please try again.' });
      }
    } catch (error) {
      console.error('Error submitting bug report:', error);
      const errorMessage = error.response?.data?.message || 'Failed to submit bug report. Please try again.';
      setErrors({ submit: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearForm = () => {
    setFormData({
      project: '',
      title: '',
      description: '',
      priority: 'medium',
      reporterName: '',
      reporterEmail: ''
    });
    setErrors({});
  };

  const handleReportAnother = () => {
    setIsSubmitted(false);
    setBugId('');
    handleClearForm();
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="bg-card-bg border-b border-gray-700 px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-text-primary">XYZ Corp Bug Tracker</h1>
            <p className="text-sm text-text-muted">Public Bug Report Form</p>
          </div>
          <Link 
            to="/"
            className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-card-bg rounded-xl p-8 shadow-2xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-2">Report a Bug</h2>
              <p className="text-text-muted">Help us improve our software by reporting bugs you encounter</p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-lg">
                {/* Project and Title Row */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="project" className="block text-sm font-bold text-gray-800 mb-2">
                      Project <span className="text-accent-red">*</span>
                    </label>
                    <select
                      id="project"
                      name="project"
                      value={formData.project}
                      onChange={handleChange}
                      disabled={projectsLoading}
                      className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all ${
                        errors.project ? 'border-accent-red' : 'border-gray-300'
                      } ${projectsLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <option value="">
                        {projectsLoading ? 'Loading projects...' : 'Select a project...'}
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
                    {errors.projects && (
                      <p className="mt-1 text-sm text-accent-red">{errors.projects}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="title" className="block text-sm font-bold text-gray-800 mb-2">
                      Bug Title <span className="text-accent-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Brief description of the bug..."
                      className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all ${
                        errors.title ? 'border-accent-red' : 'border-gray-300'
                      }`}
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-accent-red">{errors.title}</p>
                    )}
                  </div>
                </div>

                {/* Bug Description */}
                <div className="mb-6">
                  <label htmlFor="description" className="block text-sm font-bold text-gray-800 mb-2">
                    Bug Description <span className="text-accent-red">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Detailed description of the bug, steps to reproduce, expected vs actual behavior..."
                    className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all resize-vertical ${
                      errors.description ? 'border-accent-red' : 'border-gray-300'
                    }`}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-accent-red">{errors.description}</p>
                  )}
                </div>

                {/* Priority Level */}
                <div className="mb-8">
                  <label className="block text-sm font-bold text-gray-800 mb-4">Priority Level</label>
                  <div className="flex flex-wrap gap-6">
                    {priorities.map(priority => (
                      <label
                        key={priority.value}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="priority"
                          value={priority.value}
                          checked={formData.priority === priority.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                          formData.priority === priority.value 
                            ? priority.borderColor + ' bg-white' 
                            : 'border-gray-400 bg-white'
                        }`}>
                          {formData.priority === priority.value && (
                            <div className={`w-2 h-2 rounded-full ${priority.color} m-0.5`}></div>
                          )}
                        </div>
                        <span className={`px-4 py-1 rounded text-white font-medium text-sm ${priority.color}`}>
                          {priority.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Reporter Information */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Reporter Information (Optional)</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="reporterName" className="block text-sm font-bold text-gray-800 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="reporterName"
                        name="reporterName"
                        value={formData.reporterName}
                        onChange={handleChange}
                        placeholder="Enter your name (optional)..."
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="reporterEmail" className="block text-sm font-bold text-gray-800 mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="reporterEmail"
                        name="reporterEmail"
                        value={formData.reporterEmail}
                        onChange={handleChange}
                        placeholder="Enter your email for updates (optional)..."
                        className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all ${
                          errors.reporterEmail ? 'border-accent-red' : 'border-gray-300'
                        }`}
                      />
                      {errors.reporterEmail && (
                        <p className="mt-1 text-sm text-accent-red">{errors.reporterEmail}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Required Fields Note */}
                <p className="text-sm text-accent-red mb-6">* Required fields</p>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="p-3 bg-accent-red/10 border border-accent-red rounded-lg mb-6">
                    <p className="text-sm text-accent-red">{errors.submit}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="spinner mr-2"></div>
                        Submitting...
                      </div>
                    ) : (
                      'Submit Bug Report'
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleClearForm}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    Clear Form
                  </button>
                </div>
              </form>
            ) : (
              /* Success Confirmation */
              <div className="bg-green-50 border border-green-200 rounded-lg p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-2xl">✓</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-green-800 mb-4">Success Confirmation</h3>
                  <p className="text-green-700 mb-4">
                    Bug report submitted successfully! Bug ID: <span className="font-mono font-bold">{bugId}</span>
                  </p>
                  
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleReportAnother}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      Report Another Bug
                    </button>
                    
                    <Link
                      to="/"
                      className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 inline-block"
                    >
                      Back to Home
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicBugReportPage;
