import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-card-bg border-b border-gray-700 px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold text-accent-red hover:text-accent-coral transition-colors">
            XYZ
          </Link>
          <span className="text-text-muted">Bug Tracker</span>
        </div>
        
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <div className="text-text-primary">
                <span className="text-sm text-text-muted">Welcome, </span>
                <span className="font-medium">{user.fullName}</span>
                <span className="ml-2 px-2 py-1 bg-accent-red text-white text-xs rounded-full">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-accent-red hover:bg-accent-coral px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;