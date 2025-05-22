import React from 'react';
import Navigation from '../components/Navigation';

function GetStarted() {
  return (
    <div className="page">
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
            Follow these steps to implement Ten-Factors in your organization
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-content">
          <h2 className="section-title">The ten key areas we measure</h2>
          <img width="100%" src="header-factors.svg" alt="Ten Factors Illustration" />
        </div>
      </section>
    </div>
  );
}

export default GetStarted;
