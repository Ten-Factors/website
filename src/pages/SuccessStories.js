import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

function SuccessStories() {
  return (
    <div className="page page-success-stories">
      <Navigation />

      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">How teams use Ten-Factors</h1>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-content">
          <h2 className="section-title">Success Stories</h2>
        </div>
      </section>

      <section className="section section-read-further">
        <div className="section-content">
          <h2 className="section-title">Read further</h2>
          <div className="read-further-links">
            <Link to="/get-started" className="read-further-link">
              <h3>Get Started</h3>
              <p>Begin your journey with Ten-Factors</p>
            </Link>
            <Link to="/best-practices" className="read-further-link">
              <h3>Library of Best Practices</h3>
              <p>Explore catalogue of industry best practices and guidelines</p>
            </Link>
            <Link to="/advantages" className="read-further-link">
              <h3>Advantages</h3>
              <p>Discover how Ten-Factors different from existed solutions</p>
            </Link>
            <Link to="/" className="read-further-link">
              <h3>About</h3>
              <p>Learn more about Ten-Factors</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SuccessStories;
