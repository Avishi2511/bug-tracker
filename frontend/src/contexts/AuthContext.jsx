import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock user data for development
  const mockUsers = {
    'admin@xyz.com': { 
      id: 1, 
      email: 'admin@xyz.com', 
      fullName: 'Admin User', 
      role: 'admin' 
    },
    'dev@xyz.com': { 
      id: 2, 
      email: 'dev@xyz.com', 
      fullName: 'Developer User', 
      role: 'developer' 
    },
    'tester@xyz.com': { 
      id: 3, 
      email: 'tester@xyz.com', 
      fullName: 'Tester User', 
      role: 'tester' 
    }
  };

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock authentication - replace with real API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockUser = mockUsers[email];
        if (mockUser && password === 'password') {
          setUser(mockUser);
          localStorage.setItem('user', JSON.stringify(mockUser));
          resolve(mockUser);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };

  const register = async (userData) => {
    // Mock registration - replace with real API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockUsers[userData.email]) {
          reject(new Error('User already exists'));
        } else {
          const newUser = {
            id: Date.now(),
            ...userData
          };
          // In real app, this would be saved to backend
          resolve(newUser);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};