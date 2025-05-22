import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 200); // Show nav after scrolling 100px
    };

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial scroll position
    } else {
      setIsScrolled(true); // Always show nav on non-home pages
    }

    return () => {
      if (isHomePage) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isHomePage]);

  const getLinkClass = (path) => {
    const isActive = location.pathname === path && !isHomePage;
    return `nav-link${isActive ? ' nav-link-primary' : ''}`;
  };

  return (
    <nav className={`nav-menu${isHomePage ? ' nav-menu-home' : ''}${isScrolled ? ' nav-menu-visible' : ''}`}>
      <div className="nav-content">
        <Link to="/" className="nav-logo">Ten-Factors</Link>
        <div className="nav-links">
          <Link to="/" className={getLinkClass('/')}>About</Link>
          <Link to="/advantages" className={getLinkClass('/advantages')}>Advantages</Link>
          <Link to="/success-stories" className={getLinkClass('/success-stories')}>Success Stories</Link>
          <Link to="/get-started" className={`nav-link-get-started ${getLinkClass('/get-started')}`}>Get Started</Link>
          <Link to="/best-practices" className={getLinkClass('/best-practices')}>Best Practices</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
