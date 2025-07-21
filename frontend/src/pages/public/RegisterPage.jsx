import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'tester',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    try {
      await register({
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      navigate('/login', { 
        state: { message: 'Account created successfully! Please log in.' }
      });
    } catch (error) {
      setErrors({ submit: error.message || 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    // TODO: Implement Google OAuth
    console.log('Google sign up clicked');
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-accent-red hover:text-accent-coral transition-colors">
            XYZ
          </Link>
        </div>

        {/* Register Form */}
        <div className="bg-card-bg rounded-xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-text-primary text-center mb-8">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-text-primary mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all ${
                  errors.username ? 'border-accent-red' : 'border-gray-600'
                }`}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-accent-red">{errors.username}</p>
              )}
            </div>

            {/* First Name Field */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-text-primary mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all ${
                  errors.firstName ? 'border-accent-red' : 'border-gray-600'
                }`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-accent-red">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name Field */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-text-primary mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all ${
                  errors.lastName ? 'border-accent-red' : 'border-gray-600'
                }`}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-accent-red">{errors.lastName}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all ${
                  errors.email ? 'border-accent-red' : 'border-gray-600'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-accent-red">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all ${
                  errors.password ? 'border-accent-red' : 'border-gray-600'
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-accent-red">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={`w-full px-4 py-3 bg-dark-bg border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all ${
                  errors.confirmPassword ? 'border-accent-red' : 'border-gray-600'
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-accent-red">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-text-primary mb-2">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-bg border border-gray-600 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all"
              >
                <option value="tester">Tester</option>
                <option value="developer">Developer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-accent-red bg-dark-bg border-gray-600 rounded focus:ring-accent-red focus:ring-2"
              />
              <label htmlFor="agreeToTerms" className="text-sm text-text-muted">
                I agree to the{' '}
                <Link to="/terms" className="text-accent-red hover:text-accent-coral transition-colors">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-accent-red hover:text-accent-coral transition-colors">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-sm text-accent-red">{errors.agreeToTerms}</p>
            )}

            {/* Submit Error */}
            {errors.submit && (
              <div className="p-3 bg-accent-red/10 border border-accent-red rounded-lg">
                <p className="text-sm text-accent-red">{errors.submit}</p>
              </div>
            )}

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent-red hover:bg-accent-coral disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card-bg text-text-muted">OR</span>
              </div>
            </div>

            {/* Google Sign Up */}
            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="w-full bg-dark-bg hover:bg-gray-700 border border-gray-600 hover:border-gray-500 text-text-primary font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span className="text-lg font-bold text-accent-red">[G]</span>
              <span>Sign Up with Google</span>
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-text-muted">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-accent-red hover:text-accent-coral font-medium transition-colors"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link 
            to="/" 
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
