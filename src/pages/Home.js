import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title product-title">Ten-Factors</h1>
            <h2 className="hero-subtitle">
              Measure and Improve Software Quality
            </h2>
            <div className="hero-description">
              <p>
                Ten-Factors is a practical open-source framework for measuring and improving software quality in technology companies 
                and products/startups. It helps companies maintain high standards and make data-driven improvements.
              </p>
            </div>
            <button className="hero-button">Get your score</button>
          </div>
          <div className="hero-image"></div>
        </div>
      </section>

      <Navigation />

      <section className="section">
        <div className="section-content">
          <h2 className="section-title">Usage process</h2>
          <p className="section-subtitle">
            Ten-Factors is designed to provide a clear, practical, and scalable approach to quality control in software development. Our approach combines automated metrics with direct team feedback, creating a complete and accurate view of service quality.
          </p>
          <div className="case-studies-content">
            (stickers, e.g. 5 steps usage process)
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-content">
          <h2 className="section-title">Comparison with existed solutions</h2>
          <p className="section-subtitle">
            Community-driven; vs linearB, vs Own Standards;
          </p>
        </div>
      </section>

      <section className="section section-case-studies">
        <div className="section-content">
          <h2 className="section-title">Case Studies & Testimonials</h2>
          <p className="section-subtitle">
            Discover how Ten-Factors has transformed software quality for companies of different sizes and industries.
          </p>
          <div className="case-studies-content">
            <Link to="/success-stories" className="cta-button">See More Cases</Link>
          </div>
        </div>
      </section>

      <section className="section section-cta">
        <div className="section-content">
          <h2 className="section-title">Ready to try Ten-Factors?</h2>
          <p className="section-subtitle">
            Start measuring and improving your software quality today.
          </p>
          <div className="cta-buttons">
            <Link to="/get-started" className="cta-button">Get Started Now</Link>
          </div>
        </div>
      </section>

      <section className="section section-contributors">
        <div className="section-content">
          <h2 className="section-title">Contributors</h2>
          <p className="section-subtitle">
            Ten-Factors is an open-source project which is maintained by community. We grateful for all people who contributed to this project.
          </p>
          <ul className="contributors-list">
            <li className="contributor-item">
              <div className="contributor-avatar">
                <img src="https://github.com/itspoma.png" alt="Roman Rodomansky" />
              </div>
              <div className="contributor-info">
                <a href="https://github.com/itspoma" className="contributor-name" target="_blank" rel="nofollow noopener noreferrer">Roman Rodomansky</a>
                <p className="contributor-role">Co-Founder at <a className="link" href="https://ralabs.org/cases/" target="_blank">Ralabs</a></p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="section section-read-further">
        <div className="section-content">
          <h2 className="section-title">Read further</h2>
          <div className="read-further-links">
            <Link to="/advantages" className="read-further-link">
              <h3>Advantages</h3>
              <p>Discover how Ten-Factors different from existed solutions</p>
            </Link>
            <Link to="/success-stories" className="read-further-link">
              <h3>Success Stories</h3>
              <p>See how Ten-Factors can supercharge your software quality</p>
            </Link>
            <Link to="/best-practices" className="read-further-link">
              <h3>Library of Best Practices</h3>
              <p>Explore catalogue of industry best practices and guidelines</p>
            </Link>
            <Link to="/get-started" className="read-further-link">
              <h3>Get your score</h3>
              <p>Begin your journey with Ten-Factors</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
