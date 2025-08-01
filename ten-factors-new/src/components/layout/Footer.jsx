import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1">
            <div className="text-xl font-bold text-primary mb-4">Ten-Factors</div>
            <p className="text-tertiary text-sm">
              Measure and improve software delivery performance with our comprehensive assessment tool.
            </p>
          </div>
          
          {/* Links columns */}
          <div>
            <h3 className="font-semibold text-primary mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-tertiary">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-primary mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-tertiary">
              <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-primary mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-tertiary">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-tertiary">
            © 2024 Ten-Factors. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-tertiary hover:text-primary transition-colors text-xs">
              Cookie Declaration
            </a>
            <span className="text-tertiary text-xs">/</span>
            <a href="#" className="text-tertiary hover:text-primary transition-colors text-xs">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
