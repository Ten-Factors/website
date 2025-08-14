import React from 'react';
import { NAVIGATION } from '../../assets/constants';

/**
 * NavigationLinks
 * Renders site navigation links in horizontal (desktop) or vertical (mobile) layout.
 * Props:
 * - orientation: 'horizontal' | 'vertical' (default: 'horizontal')
 * - onNavigate: optional callback invoked when a link is clicked (useful to close mobile drawer)
 */
const NavigationLinks = ({ orientation = 'horizontal', onNavigate }) => {
  
  const containerClass =
    orientation === 'vertical'
      ? 'flex flex-col space-y-6'
      : 'hidden md:flex justify-center flex-wrap items-center gap-6 px-4 py-2 rounded-[18px]';

  return (
    <div className={containerClass}>
      {NAVIGATION.links.map((link, idx) => (
        <div
          key={idx}
          className={
            orientation === 'horizontal' 
              ? 'flex items-center justify-start h-9 px-4 py-0 relative group' 
              : ''
          }
        >
          {/* Hover underline effect for horizontal orientation */}
          {orientation === 'horizontal' && (
            <div
              aria-hidden="true"
              className="absolute border-[#020205] border-[0px_0px_2px] border-solid inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            />
          )}
          
          <a
            href={link.href}
            className={
              orientation === 'horizontal'
                ? 'flex flex-col font-medium justify-center leading-[0] text-[#020205] text-[16px] text-center text-nowrap hover:text-[#020205] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400'
                : 'text-[#020205] hover:text-gray-600 transition-colors'
            }
            onClick={onNavigate}
          >
            <span className={orientation === 'horizontal' ? 'block leading-[24px] whitespace-pre pb-0.5' : ''}>
              {link.label}
            </span>
          </a>
        </div>
      ))}
    </div>
  );
};

export default NavigationLinks;
