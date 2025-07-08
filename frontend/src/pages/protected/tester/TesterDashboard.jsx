import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/common/Navbar';

const TesterDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    bugsReported: 0,
    statusBreakdown: {
      open: 0,
      inProgress: 0,
      closed: 0
    }
  });

  useEffect(() => {
    // Mock data loading
    setTimeout(() => {
      setStats({
        bugsReported: 28,
        statusBreakdown: {
          open: 8,
          inProgress: 12,
          closed: 8
        }
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
    { id: 'report', label: 'Report Bug', active: false },
    { id: 'mybugs', label: 'My Bugs', active: false }
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
                  onClick={() => setActiveTab(item.id)}
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

          {/* Personal Statistics */}
          <div className="mb-8">
            <h1 className="fade-in text-2xl font-bold text-text-primary mb-6">Personal Statistics</h1>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Bugs Reported by Me */}
              <div className="scale-in bg-card-bg p-6 rounded-xl border border-gray-700 hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <h3 className="text-lg font-bold text-text-primary mb-4">Bugs Reported by Me</h3>
                <div className="bg-dark-bg p-4 rounded-lg border border-green-500">
                  <div className="text-3xl font-bold text-accent-red">{stats.bugsReported}</div>
                  <div className="text-text-muted text-sm">Total bugs reported</div>
                </div>
              </div>

              {/* Bug Status Breakdown */}
              <div className="scale-in bg-card-bg p-6 rounded-xl border border-gray-700 hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <h3 className="text-lg font-bold text-text-primary mb-4">Bug Status Breakdown</h3>
                <div className="bg-dark-bg p-4 rounded-lg border border-orange-500">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-muted">Open:</span>
                      <span className="text-red-500 font-bold">{stats.statusBreakdown.open}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">In Progress:</span>
                      <span className="text-yellow-500 font-bold">{stats.statusBreakdown.inProgress}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Closed:</span>
                      <span className="text-green-500 font-bold">{stats.statusBreakdown.closed}</span>
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
                <button className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Report New Bug
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  View My Bugs
                </button>
              </div>
            </div>
          </div>

          {/* Recent Bug Reports */}
          <div className="fade-in">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Recent Bug Reports</h2>
            <div className="bg-card-bg p-6 rounded-xl border border-gray-700">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                  <div>
                    <div className="text-text-primary font-medium">Search functionality not working</div>
                    <div className="text-text-muted text-sm">Bug #028 • Reported 1 hour ago</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-red-600 text-white text-sm rounded-full">Open</span>
                    <span className="px-3 py-1 bg-orange-600 text-white text-sm rounded-full">High</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                  <div>
                    <div className="text-text-primary font-medium">Button alignment issue on mobile</div>
                    <div className="text-text-muted text-sm">Bug #027 • Reported 3 hours ago</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-yellow-600 text-white text-sm rounded-full">In Progress</span>
                    <span className="px-3 py-1 bg-yellow-500 text-white text-sm rounded-full">Medium</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                  <div>
                    <div className="text-text-primary font-medium">Form validation error message</div>
                    <div className="text-text-muted text-sm">Bug #026 • Reported yesterday</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full">Closed</span>
                    <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">Low</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                  <div>
                    <div className="text-text-primary font-medium">Dashboard loading timeout</div>
                    <div className="text-text-muted text-sm">Bug #025 • Reported 2 days ago</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-yellow-600 text-white text-sm rounded-full">In Progress</span>
                    <span className="px-3 py-1 bg-red-600 text-white text-sm rounded-full">Critical</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TesterDashboard;