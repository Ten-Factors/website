import React from 'react';
import Navigation from '../components/Navigation';

function Process() {
  return (
    <div className="page">
      <Navigation />

      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Ten-Factors Process & Methodology Explanation</h1>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-content">
          <h2 className="section-title">The Ten Key Areas We Measure</h2>
          <img width="100%" src="ten-factors-website/header-factors.svg" alt="Ten Factors Illustration" />
        </div>
      </section>

    </div>
  );
}

export default Process;
