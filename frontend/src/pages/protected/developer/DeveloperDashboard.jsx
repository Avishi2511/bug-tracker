import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/common/Navbar';
import { getDeveloperDashboardStats } from '../../../data/mockStats';

const DeveloperDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  
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

  const [stats, setStats] = useState({
    assignedBugs: 0,
    priorityBreakdown: {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0
    },
    currentWork: []
  });

  useEffect(() => {
    // Data fetching logic will go here
    // For now, we'll just initialize with empty stats

    // Animation trigger
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .scale-in');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 100);
    });
  }, []);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', active: true },
    { id: 'assigned', label: 'Assigned Bugs', active: false },
    { id: 'history', label: 'Work History', active: false }
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-card-bg min-h-screen border-r border-gray-700">
          <div className="p-6">
            <h2 className="text-lg font-bold text-text-primary mb-6">Navigation</h2>
            <nav className="space-y-2">
              {navigationItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`slide-in-left w-full text-left px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                    activeTab === item.id
                      ? 'bg-accent-red text-white'
                      : 'text-text-primary hover:bg-gray-700'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Breadcrumb */}
          <div className="fade-in bg-gray-800 px-4 py-2 rounded-lg mb-6">
            <span className="text-text-muted text-sm">Home &gt; Dashboard</span>
          </div>

          {/* Work Queue Statistics */}
          <div className="mb-8">
            <h1 className="fade-in text-2xl font-bold text-text-primary mb-6">Work Queue Statistics</h1>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Assigned Bugs Count */}
              <div className="scale-in bg-card-bg p-6 rounded-xl border border-gray-700 hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <h3 className="text-lg font-bold text-text-primary mb-4">Assigned Bugs Count</h3>
                <div className="bg-dark-bg p-4 rounded-lg border border-red-500">
                  <div className="text-3xl font-bold text-accent-red">{stats.assignedBugs}</div>
                  <div className="text-text-muted text-sm">Bugs assigned to you</div>
                </div>
              </div>

              {/* Priority Breakdown */}
              <div className="scale-in bg-card-bg p-6 rounded-xl border border-gray-700 hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <h3 className="text-lg font-bold text-text-primary mb-4">Priority Breakdown</h3>
                <div className="bg-dark-bg p-4 rounded-lg border border-blue-500">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-muted">Critical:</span>
                      <span className="text-red-500 font-bold">{stats.priorityBreakdown.critical}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">High:</span>
                      <span className="text-orange-500 font-bold">{stats.priorityBreakdown.high}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Medium:</span>
                      <span className="text-yellow-500 font-bold">{stats.priorityBreakdown.medium}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Low:</span>
                      <span className="text-blue-500 font-bold">{stats.priorityBreakdown.low}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="fade-in text-2xl font-bold text-text-primary mb-6">Quick Actions</h2>
            <div className="fade-in bg-card-bg p-8 rounded-xl border border-gray-700">
              <div className="flex flex-wrap gap-6 justify-center">
                <button 
                  onClick={() => handleNavigation('assigned')}
                  className="bg-orange-600 hover:bg-orange-700 px-8 py-4 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  View Assigned Bugs
                </button>
                <button 
                  onClick={() => handleNavigation('assigned')}
                  className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Update Bug Status
                </button>
              </div>
            </div>
          </div>

          {/* Current Work */}
          <div className="fade-in">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Current Work</h2>
            <div className="bg-card-bg p-6 rounded-xl border border-gray-700">
              {/* Priority Badges */}
              <div className="flex flex-wrap gap-4 mb-6">
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

              {/* Bug List */}
              <div className="space-y-4">
                {stats.currentWork.map(bug => (
                  <div key={bug.id} className={`flex items-center justify-between p-4 bg-dark-bg rounded-lg border-l-4 border-${bug.priority === 'critical' ? 'red' : bug.priority === 'high' ? 'orange' : 'yellow'}-500`}>
                    <div>
                      <div className="text-text-primary font-medium">{bug.title}</div>
                      <div className="text-text-muted text-sm">{bug.bugId} • Assigned {bug.assignedAt}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 bg-${bug.priority === 'critical' ? 'red' : bug.priority === 'high' ? 'orange' : 'yellow'}-600 text-white text-sm rounded-full`}>
                        {bug.priority.charAt(0).toUpperCase() + bug.priority.slice(1)}
                      </span>
                      <button 
                        onClick={() => handleNavigation('assigned')}
                        className="px-3 py-1 bg-accent-red hover:bg-accent-coral text-white text-sm rounded-lg transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;
