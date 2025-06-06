import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

function Advantages() {
  return (
    <div className="page page-advantages">
      <Navigation />

      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">What makes Ten-Factors special</h1>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-content">
          <h2 className="section-title">Unique benefits of Ten Factors (incl. comparison with ISO, 3rd party tools)</h2>
        </div>
      </section>

      <section className="section section-costs">
        <div className="section-content">
          <h2 className="section-title">How much software quality costs?</h2>
          <div className="costs-grid">
            <div className="cost-column">
              <h3 className="cost-column-title">For Products/Startups</h3>
              <div className="cost-items">
                <div className="cost-item">
                  <h4>Technical Debt & Slower Feature Delivery</h4>
                  <p>Poorly written or untested code accumulates into tech debt that slows the entire team. Teams spend up to 42% of dev time on managing avoidable technical debt.</p>
                </div>
                <div className="cost-item">
                  <h4>Revenue Loss from Downtime</h4>
                  <p>When bugs reach production, they cause outages, crashes, or degraded performance. Even an hour of downtime can cost from $100K to over $1M for your product.</p>
                </div>
              </div>
            </div>
            <div className="cost-column">
              <h3 className="cost-column-title">For Service Companies</h3>
              <div className="cost-items">
                <div className="cost-item">
                  <h4>Client Churn</h4>
                  <p>Dissatisfied clients leave, leading to lost revenue.</p>
                </div>
                <div className="cost-item">
                  <h4>Missed Upsell Opportunities</h4>
                  <p>Without clear quality metrics, clients are less likely to buy more services.</p>
                </div>
                <div className="cost-item">
                  <h4>Increased Supervision</h4>
                  <p>Managers spend more time firefighting instead of focusing on growth.</p>
                </div>
                <div className="cost-item">
                  <h4>Rework Costs</h4>
                  <p>Fixing bugs and issues takes time away from new projects.</p>
                </div>
                <div className="cost-item">
                  <h4>Reputation Damage</h4>
                  <p>Poor quality leads to negative word of mouth.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-content">
          <h2 className="section-title">Who should use Ten-Factors?</h2>
          <p className="section-subtitle">
            Ten-Factors is designed for everyone who cares about delivering high-quality software. Whether you're leading the company, managing projects, or writing code, Ten-Factors gives you clear, actionable insights.
          </p>
        </div>
      </section>

      <section className="section section-read-further">
        <div className="section-content">
          <h2 className="section-title">Read further</h2>
          <div className="read-further-links">
            <Link to="/success-stories" className="read-further-link">
              <h3>Success Stories</h3>
              <p>See how Ten-Factors can supercharge your software quality</p>
            </Link>
            <Link to="/get-started" className="read-further-link">
              <h3>Get your score</h3>
              <p>Begin your journey with Ten-Factors</p>
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

export default Advantages;
