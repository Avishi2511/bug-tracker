import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AdminDashboard from './admin/AdminDashboard';
import DeveloperDashboard from './developer/DeveloperDashboard';
import TesterDashboard from './tester/TesterDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  // Route to appropriate dashboard based on user role
  switch (user?.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'developer':
      return <DeveloperDashboard />;
    case 'tester':
      return <TesterDashboard />;
    default:
      return (
        <div className="min-h-screen bg-dark-bg flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-text-primary mb-4">Access Denied</h1>
            <p className="text-text-muted">Invalid user role</p>
          </div>
        </div>
      );
  }
};

export default Dashboard;