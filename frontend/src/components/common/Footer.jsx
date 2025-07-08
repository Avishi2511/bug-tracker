import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-card-bg border-t border-gray-700 py-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-xl font-bold mb-4 text-accent-red">XYZ</div>
            <p className="text-text-muted">Revolutionizing bug tracking for modern development teams.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-text-primary">Product</h4>
            <div className="space-y-2 text-text-muted">
              <div>Features</div>
              <div>Pricing</div>
              <div>Documentation</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-text-primary">Company</h4>
            <div className="space-y-2 text-text-muted">
              <div>About</div>
              <div>Careers</div>
              <div>Contact</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-text-primary">Connect</h4>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gray-600 rounded"></div>
              <div className="w-8 h-8 bg-gray-600 rounded"></div>
              <div className="w-8 h-8 bg-gray-600 rounded"></div>
              <div className="w-8 h-8 bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;