import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

function NotFound() {
  return (
    <div>
      <Navigation />
      <div className="section section-not-found">
        <div className="section-content">
          <div className="not-found-container">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you are looking for doesn't exist or has been moved.</p>
            <div className="not-found-actions">
              <Link to="/" className="button button-primary">Go to Homepage</Link>
              <a href="https://github.com/ten-factors/website/issues" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="button button-secondary">
                Report an Issue
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
