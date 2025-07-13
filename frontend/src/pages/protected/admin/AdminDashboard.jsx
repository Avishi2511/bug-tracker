import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/common/Navbar';
import * as api from '../../../utils/api';
import { useAuth } from '../../../contexts/AuthContext';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalBugs: 0,
    activeUsers: 0,
    activeProjects: 0,
    recentActivity: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch all data in parallel
        const [bugsResponse, usersResponse, projectsResponse] = await Promise.all([
          api.getBugs(),
          api.getUsers(),
          api.getProjects()
        ]);

        console.log('Admin Dashboard API responses:', {
          bugs: bugsResponse.data,
          users: usersResponse.data,
          projects: projectsResponse.data
        });

        let totalBugs = 0;
        let activeUsers = 0;
        let activeProjects = 0;
        let recentActivity = [];

        // Process bugs data
        if (bugsResponse.data.success) {
          const bugs = bugsResponse.data.data.bugs || bugsResponse.data.data || [];
          totalBugs = Array.isArray(bugs) ? bugs.length : 0;
          
          // Create recent activity from recent bugs
          if (Array.isArray(bugs)) {
            const recentBugs = bugs
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 3)
              .map((bug, index) => ({
                id: `bug-${index}`,
                message: `New bug reported: ${bug.title}`,
                timestamp: new Date(bug.createdAt).toLocaleString(),
                type: 'bug',
                priority: bug.priority
              }));
            recentActivity = [...recentActivity, ...recentBugs];
          }
        }

        // Process users data
        if (usersResponse.data.success) {
          const users = usersResponse.data.data || [];
          activeUsers = Array.isArray(users) ? users.filter(user => user.isActive).length : 0;
        }

        // Process projects data
        if (projectsResponse.data.success) {
          const projects = projectsResponse.data.data.projects || projectsResponse.data.data || [];
          activeProjects = Array.isArray(projects) ? projects.filter(project => project.status === 'active').length : 0;
        }

        setStats({
          totalBugs,
          activeUsers,
          activeProjects,
          recentActivity: recentActivity.slice(0, 5) // Limit to 5 recent activities
        });

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();

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
    { id: 'bugs', label: 'Bug Management', active: false },
    { id: 'users', label: 'User Management', active: false },
    { id: 'projects', label: 'Project Management', active: false }
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
              <Link
                to="/admin"
                className="slide-in-left block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 bg-accent-red text-white"
              >
                Dashboard
              </Link>
              <Link
                to="/admin/bugs"
                className="slide-in-left block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 text-text-primary hover:bg-gray-700"
              >
                Bug Management
              </Link>
              <Link
                to="/admin/users"
                className="slide-in-left block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 text-text-primary hover:bg-gray-700"
              >
                User Management
              </Link>
              <Link
                to="/admin/projects"
                className="slide-in-left block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 text-text-primary hover:bg-gray-700"
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
            <span className="text-text-muted text-sm">Home &gt; Dashboard</span>
          </div>

          {/* Statistics Overview */}
          <div className="mb-8">
            <h1 className="fade-in text-2xl font-bold text-text-primary mb-6">Statistics Overview</h1>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Total Bugs */}
              <div className="scale-in bg-card-bg p-6 rounded-xl border border-gray-700 hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <h3 className="text-lg font-bold text-text-primary mb-4">Total Bugs Count</h3>
                <div className="bg-dark-bg p-4 rounded-lg border border-blue-500">
                  <div className="text-3xl font-bold text-accent-red">{stats.totalBugs}</div>
                  <div className="text-text-muted text-sm">All reported bugs</div>
                </div>
              </div>

              {/* Active Users */}
              <div className="scale-in bg-card-bg p-6 rounded-xl border border-gray-700 hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <h3 className="text-lg font-bold text-text-primary mb-4">Active Users Count</h3>
                <div className="bg-dark-bg p-4 rounded-lg border border-green-500">
                  <div className="text-3xl font-bold text-accent-red">{stats.activeUsers}</div>
                  <div className="text-text-muted text-sm">Registered users</div>
                </div>
              </div>

              {/* Active Projects */}
              <div className="scale-in bg-card-bg p-6 rounded-xl border border-gray-700 hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <h3 className="text-lg font-bold text-text-primary mb-4">Active Projects Count</h3>
                <div className="bg-dark-bg p-4 rounded-lg border border-orange-500">
                  <div className="text-3xl font-bold text-accent-red">{stats.activeProjects}</div>
                  <div className="text-text-muted text-sm">Active projects</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="fade-in text-2xl font-bold text-text-primary mb-6">Quick Actions</h2>
            <div className="fade-in bg-card-bg p-8 rounded-xl border border-gray-700">
              <div className="flex flex-wrap gap-6 justify-center">
                <Link
                  to="/admin/users"
                  className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg inline-block"
                >
                  Create New User
                </Link>
                <Link
                  to="/admin/projects"
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg inline-block"
                >
                  Create New Project
                </Link>
                <Link
                  to="/admin/bugs"
                  className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg inline-block"
                >
                  View All Bugs
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="fade-in">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Recent Activity</h2>
            <div className="bg-card-bg p-6 rounded-xl border border-gray-700">
              <div className="space-y-4">
                {stats.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                    <div>
                      <div className="text-text-primary font-medium">{activity.message}</div>
                      <div className="text-text-muted text-sm">{activity.timestamp}</div>
                    </div>
                    <span className={`px-3 py-1 text-white text-sm rounded-full ${
                      activity.type === 'bug' 
                        ? activity.priority === 'critical' ? 'bg-accent-red' : 'bg-blue-600'
                        : 'bg-green-600'
                    }`}>
                      {activity.type === 'bug' ? activity.priority : 'New User'}
                    </span>
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

export default AdminDashboard;
