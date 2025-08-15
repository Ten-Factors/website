import React from 'react';
import Newsletter from '../sections/Newsletter';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-12" role="contentinfo">
      <div className="container-custom">
        {/* Subscribe to our newsletter */}
        <Newsletter />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1">
            <div className="text-xl font-bold text-primary mb-4">Ten-Factors</div>
            <p className="text-tertiary text-sm">Measure and improve software delivery performance with our comprehensive assessment tool.</p>
          </div>
          
          {/* Links columns */}
          <nav aria-label="Product">
            <h3 className="font-semibold text-primary mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-tertiary">
              <li><a href="#advantages" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#application" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#best-practices" className="hover:text-primary transition-colors">Documentation</a></li>
            </ul>
          </nav>
          
          <nav aria-label="Company">
            <h3 className="font-semibold text-primary mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-tertiary">
              <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#blog" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#careers" className="hover:text-primary transition-colors">Careers</a></li>
            </ul>
          </nav>
          
          <nav aria-label="Support">
            <h3 className="font-semibold text-primary mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-tertiary">
              <li><a href="#support" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </nav>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-tertiary">
            © {year} Ten-Factors. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="#cookies" className="text-tertiary hover:text-primary transition-colors text-xs">Cookie Declaration</a>
            <span className="text-tertiary text-xs">/</span>
            <a href="#privacy" className="text-tertiary hover:text-primary transition-colors text-xs">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
