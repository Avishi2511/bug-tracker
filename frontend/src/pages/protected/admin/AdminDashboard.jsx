import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/common/Navbar';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalBugs: 0,
    activeUsers: 0,
    activeProjects: 0
  });

  useEffect(() => {
    // Mock data loading
    setTimeout(() => {
      setStats({
        totalBugs: 247,
        activeUsers: 18,
        activeProjects: 5
      });
    }, 500);

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
                <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                  <div>
                    <div className="text-text-primary font-medium">New bug reported: Login page crash</div>
                    <div className="text-text-muted text-sm">2 minutes ago</div>
                  </div>
                  <span className="px-3 py-1 bg-accent-red text-white text-sm rounded-full">Critical</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                  <div>
                    <div className="text-text-primary font-medium">User John Doe registered</div>
                    <div className="text-text-muted text-sm">15 minutes ago</div>
                  </div>
                  <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full">New User</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                  <div>
                    <div className="text-text-primary font-medium">Bug #123 marked as resolved</div>
                    <div className="text-text-muted text-sm">1 hour ago</div>
                  </div>
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">Resolved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
