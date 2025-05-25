import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

function GetStarted() {
  return (
    <div className="page page-get-started">
      <Navigation />

      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Easy onboarding to Ten-Factors</h1>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-content">
          <h2 className="section-title">Getting Started Guide</h2>
          <p className="section-subtitle">
            Description here. Follow these steps to implement Ten-Factors in your organization
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-content">
          <h2 className="section-title">Step-by-step guide</h2>
          <p className="section-subtitle">
            (download app) -> (select the most priority factors, or all) -> (execute with team) -> (get insights)
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-content">
          <h2 className="section-title">The ten key areas we measure (explain why these categories)</h2>
          <img width="100%" src="header-factors.svg" alt="Ten Factors Illustration" />
        </div>
      </section>

      <section className="section section-read-further">
        <div className="section-content">
          <h2 className="section-title">Read further</h2>
          <div className="read-further-links">
            <Link to="/best-practices" className="read-further-link">
              <h3>Library of Best Practices</h3>
              <p>Explore catalogue of industry best practices and guidelines</p>
            </Link>
            <Link to="/success-stories" className="read-further-link">
              <h3>Success Stories</h3>
              <p>See how Ten-Factors can supercharge your software quality</p>
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

export default GetStarted;
