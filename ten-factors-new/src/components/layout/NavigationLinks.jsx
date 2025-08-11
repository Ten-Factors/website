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
  const linkBase = 'text-primary hover:text-gray-600 transition-colors';
  const containerClass =
    orientation === 'vertical'
      ? 'flex flex-col space-y-6'
      : 'hidden md:flex items-center space-x-8';

  return (
    <div className={containerClass}>
      {NAVIGATION.links.map((link, idx) => (
        <a
          key={idx}
          href={link.href}
          className={linkBase}
          onClick={onNavigate}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};

export default NavigationLinks;
