import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Ten-Factors</h1>
            <h2 className="hero-subtitle">Community-Driven and Open-Source Standard for Measuring Any Software Quality</h2>
            <div className="hero-description">
              <p>
                A practical and scalable framework for measuring and improving software quality 
                in technology service companies and products/startups. Ten-Factors help companies 
                to maintain high standards in products, and make data-driven improvements.
              </p>
              <p>
                Ten-Factors is a powerful tool for founders, CTOs, project managers, and engineers.
                It helps any team committed to delivering consistent, high-quality software services achieve their goals.
              </p>
            </div>
            <button className="hero-button">Get Started</button>
          </div>
          <div className="hero-image"></div>
        </div>
      </section>

      <Navigation />

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
            <li className="contributor-item">
              <div className="contributor-avatar">
                <img src="https://media.licdn.com/dms/image/v2/D4D03AQGAvj2d8__Eyg/profile-displayphoto-shrink_800_800/B4DZZDP1JLHwAg-/0/1744884945898?e=1753315200&v=beta&t=28k4h6HRBMLnwrl0eVgC2I8VPmTrTW0XuTpCaXHCkFI" alt="Daniel Niiaziiev" />
              </div>
              <div className="contributor-info">
                <a href="https://www.linkedin.com/in/niiaziiev/" className="contributor-name" target="_blank" rel="nofollow noopener noreferrer">Daniel Niiaziiev</a>
                <p className="contributor-role">Head of Engineering at <a className="link" href="https://ralabs.org/" target="_blank">Ralabs</a></p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section-content">
          <h2 className="section-title">Comparison with Existed Solutions</h2>
        </div>
      </section>

      <section className="section section-case-studies">
        <div className="section-content">
          <h2 className="section-title">Case Studies & Testimonials</h2>
          <p className="section-subtitle">
            Discover how Ten-Factors has transformed software quality for companies of different sizes and industries.
          </p>
          <div className="case-studies-content">
            {/* Case studies content will go here */}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-content">
          <h2 className="section-title">Usage Process</h2>
          <p className="section-subtitle">
            Ten-Factors is designed to provide a clear, practical, and scalable approach to quality control in software development. Our approach combines automated metrics with direct team feedback, creating a complete and accurate view of service quality.
          </p>
        </div>
      </section>

      <section className="section section-read-further">
        <div className="section-content">
          <h2 className="section-title">Read Further</h2>
          <div className="read-further-links">
            <Link to="/advantages" className="read-further-link">
              <h3>Advantages</h3>
              <p>Discover how Ten-Factors different from existed solutions</p>
            </Link>
            <Link to="/process" className="read-further-link">
              <h3>Process</h3>
              <p>Learn about our methodology and implementation</p>
            </Link>
            <Link to="/best-practices" className="read-further-link">
              <h3>Best Practices Hub</h3>
              <p>Explore catalogue of practices and guidelines</p>
            </Link>
            <Link to="/get-started" className="read-further-link">
              <h3>Get Started</h3>
              <p>Begin your journey with Ten-Factors</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
