import React from 'react';
import { NAVIGATION } from '../../assets/constants';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container-custom">
        <nav className="flex items-center justify-between h-16">
          {/* Logo placeholder */}
          <div className="flex items-center">
            <div className="text-xl font-bold text-primary">Ten-Factors</div>
          </div>
          
          {/* Navigation items placeholder */}
          <div className="hidden md:flex items-center space-x-8">
            {NAVIGATION.links.map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                className="text-primary hover:text-gray-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          
          {/* CTA Button placeholder */}
          <div className="flex items-center">
            <button className="btn-primary">Get Your Score</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
