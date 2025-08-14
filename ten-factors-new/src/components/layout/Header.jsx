import React from 'react';
import { useState } from 'react';
import NavigationLinks from './NavigationLinks';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b border-[#c9c0c9] sticky top-0 z-40">
      <div className="container-custom">
        <nav className="flex items-center justify-between py-4 relative">
          {/* Logo */}
          <div className="h-[52px] relative shrink-0 w-[70px]">
            <div className="absolute flex flex-col font-semibold justify-center leading-[0] left-[-1.45%] not-italic right-0 text-[#020205] text-[24px] text-center top-1/2 translate-y-[-50%]">
              <a href="#top" className="block leading-[24px]">Ten-Factors</a>
            </div>
          </div>

          {/* Desktop navigation */}
          <NavigationLinks orientation="horizontal" />

          {/* CTA Button */}
          <div className="flex items-center">
            <a 
              href="#get-score" 
              className="bg-[#ffba00] flex items-center justify-center overflow-clip px-6 py-3 rounded-[18px] shrink-0 hidden md:inline-flex hover:bg-[#e6a700] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffba00]"
            >
              <span className="font-medium text-[#020205] text-[18px] text-center text-nowrap leading-[24px]">
                Get Your Score
              </span>
            </a>

            {/* Hamburger for mobile */}
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#020205]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
      {/* Mobile slide-in drawer */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
};

export default Header;
