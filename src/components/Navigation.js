import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const getLinkClass = (path) => {
    const isActive = location.pathname === path && !isHomePage;
    return `nav-link${isActive ? ' nav-link-primary' : ''}`;
  };

  return (
    <nav className="nav-menu">
      <div className="nav-content">
        <Link to="/" className="nav-logo">Ten-Factors</Link>
        <div className="nav-links">
          <Link to="/" className={getLinkClass('/')}>About</Link>
          <Link to="/advantages" className={getLinkClass('/advantages')}>Advantages</Link>
          <Link to="/process" className={getLinkClass('/process')}>Process</Link>
          <Link to="/use-cases" className={getLinkClass('/use-cases')}>Use Cases</Link>
          <Link to="/get-started" className={`nav-link-get-started ${getLinkClass('/get-started')}`}>Get Started</Link>
          <Link to="/best-practices" className={getLinkClass('/best-practices')}>Best Practices</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
