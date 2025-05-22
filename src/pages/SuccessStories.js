import React from 'react';
import Navigation from '../components/Navigation';

function SuccessStories() {
  return (
    <div className="page">
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
    </div>
  );
}

export default SuccessStories;
