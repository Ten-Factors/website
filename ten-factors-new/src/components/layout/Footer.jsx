import React from 'react';
import Newsletter from '../sections/Newsletter';
import TwitterIcon from '../../assets/twitter-icon.svg';
import LinkedInIcon from '../../assets/linkedin-icon.svg';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-12" role="contentinfo">
      <div className="container-custom">
        <Newsletter />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 inline-flex items-center">
            <div className="text-lg font-bold text-primary mr-2">Follow Us:</div>
            
            <div className="flex items-center gap-2" data-node-id="155:9044">
              <a
                href="#"
                aria-label="Twitter"
                title="Twitter"
                rel="noopener noreferrer nofollow"
                className="primary-gradient-bg w-10 h-10 rounded-xl p-2 flex items-center justify-center overflow-hidden hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition"
              >
                <img src={TwitterIcon} alt="Twitter" className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                title="LinkedIn"
                rel="noopener noreferrer nofollow"
                className="primary-gradient-bg w-10 h-10 rounded-xl p-2 flex items-center justify-center overflow-hidden hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition"
              >
                <img src={LinkedInIcon} alt="LinkedIn" className="w-5 h-5" />
              </a>
            </div>
          </div>
          
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
