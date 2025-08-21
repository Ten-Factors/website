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

        <div className="border-t border-gray-200 mt-12 pt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="col-span-1 inline-flex items-center">
            <div className="text-lg font-bold text-primary mr-4">Follow Us:</div>
            
            <div className="flex items-center gap-4" data-node-id="155:9044">
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
          
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            <nav aria-label="Product">
              <h3 className="font-semibold text-primary mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#advantages" className="">Features</a></li>
                <li><a href="#application" className="">Pricing</a></li>
                <li><a href="#best-practices" className="">Documentation</a></li>
              </ul>
            </nav>
            
            <nav aria-label="Company">
              <h3 className="font-semibold text-primary mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="">About</a></li>
                <li><a href="#blog" className="">Blog</a></li>
                <li><a href="#careers" className="">Careers</a></li>
              </ul>
            </nav>
            
            <nav aria-label="Support">
              <h3 className="font-semibold text-primary mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#support" className="">Help Center</a></li>
                <li><a href="#contact" className="">Contact</a></li>
                <li><a href="#privacy" className="">Privacy Policy</a></li>
              </ul>
            </nav>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-12 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs">
            © {year} Ten-Factors. All rights reserved. Ten-Factors is distributed under <a href="#" className="font-bold underline" rel="noopener noreferrer nofollow">Creative Commons License.</a>
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="#cookies" className="transition-colors text-xs">Cookie Declaration</a>
            <span className="text-xs">/</span>
            <a href="#privacy" className="transition-colors text-xs">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
