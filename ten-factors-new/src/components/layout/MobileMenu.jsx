import React from 'react';
import NavigationLinks from './NavigationLinks';

/**
 * MobileMenu - slide-in drawer from the right
 * Props:
 * - open: boolean
 * - onClose: () => void
 */
const MobileMenu = ({ open, onClose }) => {
  return (
    <div className={
      `md:hidden fixed inset-0 z-50 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`
    } aria-hidden={!open}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`absolute right-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-xl transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="text-lg font-semibold text-primary">Menu</div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-primary">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 11-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-8">
          <NavigationLinks orientation="vertical" onNavigate={onClose} />

          <div className="mt-8">
            <a href="#get-score" onClick={onClose} className="btn-primary w-full inline-flex justify-center">Get Your Score</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
