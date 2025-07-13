import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/common/Navbar';
import * as api from '../../../utils/api';
import { useAuth } from '../../../contexts/AuthContext';

const TesterDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    bugsReported: 0,
    statusBreakdown: {
      open: 0,
      inProgress: 0,
      closed: 0
    },
    recentReports: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch bugs reported by current user (backend filters by role automatically)
        const bugsResponse = await api.getBugs();
        
        console.log('Dashboard bugs API response:', bugsResponse.data); // Debug log
        
        if (bugsResponse.data.success) {
          // Bugs are nested in response.data.data.bugs
          const userBugs = bugsResponse.data.data.bugs || bugsResponse.data.data || [];
          
          // Ensure userBugs is an array
          const bugsArray = Array.isArray(userBugs) ? userBugs : [];
          
          // Calculate statistics
          const bugsReported = bugsArray.length;
          const statusBreakdown = {
            open: bugsArray.filter(bug => bug.status === 'open').length,
            inProgress: bugsArray.filter(bug => bug.status === 'in-progress').length,
            closed: bugsArray.filter(bug => bug.status === 'closed').length
          };
          
          // Get recent reports (last 5)
          const recentReports = bugsArray
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5)
            .map(bug => ({
              id: bug._id,
              title: bug.title,
              bugId: `#${bug._id.slice(-6)}`,
              reportedAt: new Date(bug.createdAt).toLocaleDateString(),
              status: bug.status,
              priority: bug.priority
            }));
          
          setStats({
            bugsReported,
            statusBreakdown,
            recentReports
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }

    // Animation trigger
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .scale-in');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 100);
    });
  }, [user]);

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
              <Link
                to="/tester"
                className="slide-in-left block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 bg-accent-red text-white"
              >
                Dashboard
              </Link>
              <Link
                to="/tester/report"
                className="slide-in-left block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 text-text-primary hover:bg-gray-700"
              >
                Report Bug
              </Link>
              <Link
                to="/tester/bugs"
                className="slide-in-left block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 text-text-primary hover:bg-gray-700"
              >
                My Bugs
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
                <Link
                  to="/tester/report"
                  className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg inline-block"
                >
                  Report New Bug
                </Link>
                <Link
                  to="/tester/bugs"
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg inline-block"
                >
                  View My Bugs
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Bug Reports */}
          <div className="fade-in">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Recent Bug Reports</h2>
            <div className="bg-card-bg p-6 rounded-xl border border-gray-700">
              <div className="space-y-4">
                {stats.recentReports.map(bug => (
                  <div key={bug.id} className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                    <div>
                      <div className="text-text-primary font-medium">{bug.title}</div>
                      <div className="text-text-muted text-sm">{bug.bugId} • Reported {bug.reportedAt}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 text-white text-sm rounded-full ${
                        bug.status === 'open' ? 'bg-red-600' : bug.status === 'in-progress' ? 'bg-yellow-600' : 'bg-green-600'
                      }`}>
                        {bug.status.charAt(0).toUpperCase() + bug.status.slice(1).replace('-', ' ')}
                      </span>
                      <span className={`px-3 py-1 text-white text-sm rounded-full ${
                        bug.priority === 'critical' ? 'bg-red-600' : bug.priority === 'high' ? 'bg-orange-600' : bug.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}>
                        {bug.priority.charAt(0).toUpperCase() + bug.priority.slice(1)}
                      </span>
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

export default TesterDashboard;
