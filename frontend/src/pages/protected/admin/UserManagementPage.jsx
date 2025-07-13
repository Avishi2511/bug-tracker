import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/common/Navbar';
import * as api from '../../../utils/api';
import { useAuth } from '../../../contexts/AuthContext';

const UserManagementPage = () => {
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'tester'
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleNavigation = (tab) => {
    switch (tab) {
      case 'dashboard':
        navigate('/admin');
        break;
      case 'bugs':
        navigate('/admin/bugs');
        break;
      case 'users':
        navigate('/admin/users');
        break;
      case 'projects':
        navigate('/admin/projects');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.getUsers();
        if (response.data.success) {
          // Filter out admin users - only show developers and testers
          const nonAdminUsers = response.data.data.filter(user => user.role !== 'admin');
          setUsers(nonAdminUsers);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setErrors({ fetch: 'Failed to load users' });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    // Animation trigger
    const elements = document.querySelectorAll('.fade-in, .slide-in-left');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 100);
    });
  }, []);

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-600';
      case 'developer': return 'bg-blue-600';
      case 'tester': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'inactive': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setErrors({});
    
    try {
      const response = await api.createUser(newUser);
      
      if (response.data.success) {
        // Only add to list if not admin (since we filter out admins)
        if (newUser.role !== 'admin') {
          setUsers([...users, response.data.data.user]);
        }
        setSuccessMessage('User created successfully!');
        setNewUser({
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          role: 'tester'
        });
        setShowCreateModal(false);
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      setErrors({ 
        submit: error.response?.data?.message || 'Failed to create user. Please try again.' 
      });
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.deleteUser(userId);
        setUsers(users.filter(user => user._id !== userId));
        setSuccessMessage('User deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        setErrors({ 
          delete: error.response?.data?.message || 'Failed to delete user. Please try again.' 
        });
      }
    }
  };

  const toggleUserStatus = async (userId) => {
    const user = users.find(u => u._id === userId);
    if (!user) return;

    try {
      const newStatus = user.isActive ? false : true;
      await api.updateUser(userId, { isActive: newStatus });
      
      setUsers(users.map(u => 
        u._id === userId 
          ? { ...u, isActive: newStatus }
          : u
      ));
      setSuccessMessage(`User ${newStatus ? 'activated' : 'deactivated'} successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrors({ 
        update: error.response?.data?.message || 'Failed to update user status. Please try again.' 
      });
    }
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
                className="slide-in-left w-full text-left px-4 py-3 rounded-lg text-text-primary hover:bg-gray-700 transition-all duration-300"
              >
                Dashboard
              </button>
              <button 
                onClick={() => handleNavigation('bugs')}
                className="slide-in-left w-full text-left px-4 py-3 rounded-lg text-text-primary hover:bg-gray-700 transition-all duration-300"
              >
                Bug Management
              </button>
              <button className="slide-in-left w-full text-left px-4 py-3 rounded-lg bg-accent-red text-white transition-all duration-300">
                User Management
              </button>
              <button 
                onClick={() => handleNavigation('projects')}
                className="slide-in-left w-full text-left px-4 py-3 rounded-lg text-text-primary hover:bg-gray-700 transition-all duration-300"
              >
                Project Management
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Breadcrumb */}
          <div className="fade-in bg-gray-800 px-4 py-2 rounded-lg mb-6">
            <span className="text-text-muted text-sm">Home &gt; User Management</span>
          </div>

          {/* Page Header */}
          <div className="fade-in flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-text-primary mb-2">User Management</h1>
              <p className="text-text-muted">Manage system users and their roles</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105"
            >
              Create New User
            </button>
          </div>

          {/* Success/Error Messages */}
          {successMessage && (
            <div className="fade-in mb-6 p-4 bg-green-600/10 border border-green-600 rounded-lg">
              <p className="text-green-600">{successMessage}</p>
            </div>
          )}
          
          {(errors.fetch || errors.delete || errors.update) && (
            <div className="fade-in mb-6 p-4 bg-red-600/10 border border-red-600 rounded-lg">
              <p className="text-red-600">{errors.fetch || errors.delete || errors.update}</p>
            </div>
          )}

          {/* Users Table */}
          <div className="fade-in bg-card-bg rounded-xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Created</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Last Login</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="px-6 py-8 text-center text-text-muted">
                        Loading users...
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-6 py-8 text-center text-text-muted">
                        No users found. Create your first user to get started.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-800 transition-colors">
                        <td className="px-6 py-4 text-sm text-text-primary">#{user._id.slice(-6)}</td>
                        <td className="px-6 py-4 text-sm text-text-primary font-medium">{`${user.firstName} ${user.lastName}`}</td>
                        <td className="px-6 py-4 text-sm text-text-muted">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getRoleColor(user.role)}`}>
                            {user.role.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getStatusColor(user.isActive ? 'active' : 'inactive')}`}>
                            {user.isActive ? 'ACTIVE' : 'INACTIVE'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-text-muted">{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-sm text-text-muted">
                          {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-xs transition-colors">
                              Edit
                            </button>
                            <button
                              onClick={() => toggleUserStatus(user._id)}
                              className={`px-3 py-1 rounded text-white text-xs transition-colors ${
                                user.isActive ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'
                              }`}
                            >
                              {user.isActive ? 'Deactivate' : 'Activate'}
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-xs transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Results Summary */}
          <div className="fade-in mt-4 text-center text-text-muted">
            Total Users: {users.length}
          </div>
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card-bg rounded-xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-text-primary">Create New User</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-text-muted hover:text-text-primary text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Username</label>
                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  className="w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-red"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">First Name</label>
                  <input
                    type="text"
                    value={newUser.firstName}
                    onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                    className="w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-red"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Last Name</label>
                  <input
                    type="text"
                    value={newUser.lastName}
                    onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                    className="w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-red"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-red"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Password</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  className="w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-red"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-red"
                >
                  <option value="tester">Tester</option>
                  <option value="developer">Developer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {errors.submit && (
                <div className="p-3 bg-red-600/10 border border-red-600 rounded-lg">
                  <p className="text-sm text-red-600">{errors.submit}</p>
                </div>
              )}

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg text-white transition-colors"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
