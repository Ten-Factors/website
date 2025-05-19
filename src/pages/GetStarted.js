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
            <h1 className="hero-title">A Step-by-Step Guide for Onboarding to Ten-Factors</h1>
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
    </div>
  );
}

export default GetStarted;
