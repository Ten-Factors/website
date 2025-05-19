import React from 'react';
import Navigation from '../components/Navigation';

function BestPractices() {
  return (
    <div className="page">
      <Navigation />

      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Collection of Best Practices to Help Achieve the High Software Quality 10/10</h1>
            {/* <h2 className="hero-subtitle">A collection of best practices resources on how to build properly quality software.</h2> */}
            <div className="hero-description">
              <p>
                A guide to help engineering leaders navigate the changes to their teams, processes, and leadership skills to achieve the best possible quality for their software as their company grows.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-content">
          <h2 className="section-title">Best Practices?</h2>
          <p className="section-subtitle">
            Ten-Factors is designed for everyone who cares about delivering high-quality software. Whether you're leading the company, managing projects, or writing code, Ten-Factors gives you clear, actionable insights.
          </p>
        </div>
      </section>
    </div>
  );
}

export default BestPractices;
