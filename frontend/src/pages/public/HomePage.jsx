import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const observerRef = useRef();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all sections with animation classes
    const animatedSections = document.querySelectorAll('.section-fade-in, .section-slide-left, .section-slide-right, .section-scale-in');
    animatedSections.forEach((section) => {
      observerRef.current.observe(section);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0"></div>
      
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 opacity-30 pointer-events-none z-0"></div>
      
      {/* Main Content Wrapper */}
      <div className="relative z-10">
      {/* Navigation */}
      <nav className="glass-effect relative z-20 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-xl font-bold text-white">BugTracker Pro</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/login"
                className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
              <Link 
                to="/register"
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 hero-animation">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Hero Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                <span className="mr-2">🚀</span>
                What's new
                <span className="ml-2">Just shipped v2.0</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Streamline Bug Tracking Across Your Development Team
              </h1>
              
              <p className="text-xl text-gray-300">
                Powerful bug tracking platform supporting Public Users, Testers, Developers, and Admins. Track, manage, and resolve issues efficiently with real-time collaboration.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/register"
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
                >
                  Get Started
                </Link>
                <Link 
                  to="/report-bug"
                  className="border border-gray-600 text-white hover:bg-gray-800 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
                >
                  Report a Bug →
                </Link>
              </div>
            </div>

            {/* Right Side - Bug Dashboard */}
            <div className="glass-effect p-6 rounded-lg border border-slate-700/50 card-hover relative z-10 float-animation">
              <h2 className="text-xl font-bold mb-6 text-white">Bug Dashboard</h2>
              
              {/* Stats Row */}
              <div className="flex justify-between text-center mb-6 text-sm">
                <div>
                  <div className="font-bold text-red-400">Critical: 3</div>
                </div>
                <div>
                  <div className="font-bold text-orange-400">High: 7</div>
                </div>
                <div>
                  <div className="font-bold text-yellow-400">Medium: 12</div>
                </div>
                <div>
                  <div className="font-bold text-blue-400">Low: 8</div>
                </div>
              </div>

              {/* Bug Cards */}
              <div className="space-y-3">
                <div className="bg-slate-700/60 backdrop-blur-sm p-4 rounded-lg border border-slate-600/50 card-hover">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white text-sm">Critical: Authentication bypass vulnerability</h3>
                    <span className="bg-red-500/90 text-white px-2 py-1 rounded text-xs font-medium">Critical</span>
                  </div>
                  <p className="text-gray-300 text-xs">Assigned to: John Doe | Reporter: Security Team</p>
                </div>
                
                <div className="bg-slate-700/60 backdrop-blur-sm p-4 rounded-lg border border-slate-600/50 card-hover">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white text-sm">High: UI rendering issue on mobile</h3>
                    <span className="bg-orange-500/90 text-white px-2 py-1 rounded text-xs font-medium">High</span>
                  </div>
                  <p className="text-gray-300 text-xs">Assigned to: Sarah Wilson | Reporter: QA Team</p>
                </div>
                
                <div className="bg-slate-700/60 backdrop-blur-sm p-4 rounded-lg border border-slate-600/50 card-hover">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white text-sm">Medium: Performance optimization needed</h3>
                    <span className="bg-yellow-500/90 text-white px-2 py-1 rounded text-xs font-medium">Medium</span>
                  </div>
                  <p className="text-gray-300 text-xs">Assigned to: Mike Chen | Reporter: Development Team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 section-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Complete Bug Tracking <span className="text-red-500">Solution</span>
            </h2>
            <p className="text-xl text-gray-300">Everything you need to manage bugs from discovery to resolution</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center fade-in-up">
              <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-4 icon-hover pulse-animation">
                {/* Heartbeat/Pulse Icon */}
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Real-time Tracking</h3>
              <p className="text-gray-300 mb-4">Monitor bug status, priority levels, and assignment changes instantly across your team</p>
              <Link to="/login" className="text-red-500 hover:text-red-400 font-medium">Learn more →</Link>
            </div>
            
            <div className="text-center fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-4 icon-hover">
                {/* Users/People Icon */}
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Multi-user Support</h3>
              <p className="text-gray-300 mb-4">Seamless collaboration between Public Users, Testers, Developers, and Admins</p>
              <Link to="/login" className="text-red-500 hover:text-red-400 font-medium">Learn more →</Link>
            </div>
            
            <div className="text-center fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-4 icon-hover">
                {/* Chart/Analytics Icon */}
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Smart Prioritization</h3>
              <p className="text-gray-300 mb-4">Automated priority assignment with visual status indicators for critical, high, medium, and low severity bugs</p>
              <Link to="/login" className="text-red-500 hover:text-red-400 font-medium">Learn more →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800 section-slide-left">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Built for Every <span className="text-red-500">User Type</span>
            </h2>
            <p className="text-xl text-gray-300">Tailored experiences for different roles in your development workflow</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-700 p-6 rounded-lg border border-slate-600 card-hover fade-in-up">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4 icon-hover">
                {/* User/Person Icon */}
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Public Users</h3>
              <p className="text-gray-300 text-sm">Report bugs without registration, track submission status, receive updates on reported issues</p>
            </div>
            
            <div className="bg-slate-700 p-6 rounded-lg border border-slate-600 card-hover fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4 icon-hover">
                {/* Test Tube/Beaker Icon */}
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Testers</h3>
              <p className="text-gray-300 text-sm">Comprehensive bug reporting, test case management, detailed reproduction steps, priority assignment</p>
            </div>
            
            <div className="bg-slate-700 p-6 rounded-lg border border-slate-600 card-hover fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4 icon-hover">
                {/* Code Brackets Icon */}
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Developers</h3>
              <p className="text-gray-300 text-sm">Bug assignment and resolution, code integration, status updates, collaboration tools</p>
            </div>
            
            <div className="bg-slate-700 p-6 rounded-lg border border-slate-600 card-hover fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4 icon-hover">
                {/* Shield Icon */}
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Admins</h3>
              <p className="text-gray-300 text-sm">Full system management, user permissions, project oversight, analytics and reporting</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bug Reporting Guide */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 section-slide-right">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="text-sm text-gray-400 mb-2">Bug Reporting Guide</div>
            <h2 className="text-3xl font-bold mb-4 text-white">
              Report Bugs <span className="text-red-500">Effectively</span>
            </h2>
            <p className="text-xl text-gray-300">Help us improve the platform by following these steps to report bugs clearly and efficiently</p>
          </div>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 card-hover fade-in-up">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-400 mb-1">Step 1</div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Identify the Bug</h3>
                  <p className="text-gray-300 mb-4">Recognize when something isn't working as expected</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Notice unexpected behavior or errors</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Check if it's reproducible</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Verify it's not a user error</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Document the exact symptoms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 card-hover fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-400 mb-1">Step 2</div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Gather Information</h3>
                  <p className="text-gray-300 mb-4">Collect all relevant details about the issue</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Browser version and operating system</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Steps to reproduce the problem</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Expected vs actual behavior</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Screenshots or screen recordings</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 card-hover fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-400 mb-1">Step 3</div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Create Detailed Report</h3>
                  <p className="text-gray-300 mb-4">Write a comprehensive bug report</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Clear and descriptive title</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Step-by-step reproduction guide</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Environment details</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Attach relevant files or media</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 card-hover fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-400 mb-1">Step 4</div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Submit Report</h3>
                  <p className="text-gray-300 mb-4">Send your bug report through the proper channels</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Use the official bug reporting form</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Include all gathered information</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Tag with appropriate priority level</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Follow up if needed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 card-hover fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-400 mb-1">Step 5</div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Track Progress</h3>
                  <p className="text-gray-300 mb-4">Monitor the status of your reported bug</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Receive confirmation of submission</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Get updates on investigation progress</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Provide additional info if requested</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Verify fix when deployed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Ready to Report CTA */}
          <div className="text-center mt-12 bg-slate-800 p-8 rounded-lg border border-slate-700">
            <h3 className="text-xl font-semibold mb-4 text-white">Ready to Report a Bug?</h3>
            <p className="text-gray-300 mb-6">Follow these steps to help us identify and fix issues quickly</p>
            <Link 
              to="/report-bug"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
            >
              Start Bug Report
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800 section-scale-in">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Ready to Streamline Your <span className="text-red-500">Bug Tracking?</span>
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of development teams who trust BugTracker Pro to manage their issues efficiently. Start tracking bugs today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Start Free Trial
            </Link>
            <Link 
              to="/login"
              className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              View Demo →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-xl font-bold text-white">BugTracker Pro</div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center space-x-8 mb-8">
            <Link to="/login" className="text-gray-400 hover:text-white transition-colors">Features</Link>
            <Link to="/login" className="text-gray-400 hover:text-white transition-colors">Pricing</Link>
            <Link to="/login" className="text-gray-400 hover:text-white transition-colors">Documentation</Link>
            <Link to="/login" className="text-gray-400 hover:text-white transition-colors">Support</Link>
            <Link to="/login" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/login" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
          </div>
          
          <div className="text-center text-gray-400">
            <p>&copy; 2024 BugTracker Pro. Professional bug tracking platform for development teams.</p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default HomePage;
