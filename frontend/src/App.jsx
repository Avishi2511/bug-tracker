import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Public Pages
import HomePage from './pages/public/HomePage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import PublicBugReportPage from './pages/public/PublicBugReportPage';

// Protected Pages
import ProtectedRoute from './components/common/ProtectedRoute';
import Dashboard from './pages/protected/Dashboard';
import AdminDashboard from './pages/protected/admin/AdminDashboard';
import DeveloperDashboard from './pages/protected/developer/DeveloperDashboard';
import TesterDashboard from './pages/protected/tester/TesterDashboard';

// Additional Admin Pages
import BugManagementPage from './pages/protected/admin/BugManagementPage';
import UserManagementPage from './pages/protected/admin/UserManagementPage';
import ProjectManagementPage from './pages/protected/admin/ProjectManagementPage';

// Additional Tester Pages
import ReportBugPage from './pages/protected/tester/ReportBugPage';
import MyBugsPage from './pages/protected/tester/MyBugsPage';

// Additional Developer Pages
import AssignedBugsPage from './pages/protected/developer/AssignedBugsPage';
import WorkHistoryPage from './pages/protected/developer/WorkHistoryPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/report-bug" element={<PublicBugReportPage />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* Role-specific dashboards */}
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/developer" element={
              <ProtectedRoute requiredRole="developer">
                <DeveloperDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/tester" element={
              <ProtectedRoute requiredRole="tester">
                <TesterDashboard />
              </ProtectedRoute>
            } />
            
            {/* Admin Sub-pages */}
            <Route path="/admin/bugs" element={
              <ProtectedRoute requiredRole="admin">
                <BugManagementPage />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/users" element={
              <ProtectedRoute requiredRole="admin">
                <UserManagementPage />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/projects" element={
              <ProtectedRoute requiredRole="admin">
                <ProjectManagementPage />
              </ProtectedRoute>
            } />
            
            {/* Tester Sub-pages */}
            <Route path="/tester/report" element={
              <ProtectedRoute requiredRole="tester">
                <ReportBugPage />
              </ProtectedRoute>
            } />
            
            <Route path="/tester/bugs" element={
              <ProtectedRoute requiredRole="tester">
                <MyBugsPage />
              </ProtectedRoute>
            } />
            
            {/* Developer Sub-pages */}
            <Route path="/developer/assigned" element={
              <ProtectedRoute requiredRole="developer">
                <AssignedBugsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/developer/history" element={
              <ProtectedRoute requiredRole="developer">
                <WorkHistoryPage />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;