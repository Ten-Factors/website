import './App.css';

function App() {
  return (
    <div className="App">
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

      <nav className="nav-menu">
        <div className="nav-content">
          <a href="#" className="nav-logo">Ten-Factors</a>
          <div className="nav-links">
            <a href="#" className="nav-link">Home</a>
            <a href="#description" className="nav-link">Description</a>
            <a href="#learning-hub" className="nav-link">Engineering Checklist</a>
            <a href="#get-started" className="nav-link nav-link-primary">Get Started</a>
          </div>
        </div>
      </nav>

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
                <p className="contributor-role">Co-Founder of <a className="link" href="https://ralabs.org/cases/" target="_blank">Ralabs</a></p>
              </div>
            </li>
            <li className="contributor-item">
              <div className="contributor-avatar">
                <img src="https://github.com/david-smith.png" alt="Yuriy Sapronov" />
              </div>
              <div className="contributor-info">
                <a href="https://github.com/Yuriy-Sapronov" className="contributor-name" target="_blank" rel="nofollow noopener noreferrer">Yuriy Sapronov</a>
                <p className="contributor-role">Developer</p>
              </div>
            </li>
            <li className="contributor-item">
              <div className="contributor-avatar">
                <img src="https://github.com/sarah-chen.png" alt="Sarah Chen" />
              </div>
              <div className="contributor-info">
                <a href="https://github.com/sarah-chen" className="contributor-name" target="_blank" rel="nofollow noopener noreferrer">Sarah Chen</a>
                <p className="contributor-role">Quality Assurance Lead</p>
              </div>
            </li>
            <li className="contributor-item">
              <div className="contributor-avatar">
                <img src="https://github.com/alex-kumar.png" alt="Alex Kumar" />
              </div>
              <div className="contributor-info">
                <a href="https://github.com/alex-kumar" className="contributor-name" target="_blank" rel="nofollow noopener noreferrer">Alex Kumar</a>
                <p className="contributor-role">Documentation & Community</p>
              </div>
            </li>
            <li className="contributor-item">
              <div className="contributor-avatar">
                <img src="https://github.com/maria-rodriguez.png" alt="Maria Rodriguez" />
              </div>
              <div className="contributor-info">
                <a href="https://github.com/maria-rodriguez" className="contributor-name" target="_blank" rel="nofollow noopener noreferrer">Maria Rodriguez</a>
                <p className="contributor-role">DevOps Engineer</p>
              </div>
            </li>
            <li className="contributor-item">
              <div className="contributor-avatar">
                <img src="https://github.com/david-smith.png" alt="David Smith" />
              </div>
              <div className="contributor-info">
                <a href="https://github.com/david-smith" className="contributor-name" target="_blank" rel="nofollow noopener noreferrer">David Smith</a>
                <p className="contributor-role">Frontend Developer</p>
              </div>
            </li>
            <li className="contributor-item">
              <div className="contributor-avatar">
                <img src="https://github.com/emily-zhang.png" alt="Emily Zhang" />
              </div>
              <div className="contributor-info">
                <a href="https://github.com/emily-zhang" className="contributor-name" target="_blank" rel="nofollow noopener noreferrer">Emily Zhang</a>
                <p className="contributor-role">Backend Developer</p>
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

      <section className="section">
        <div className="section-content">
          <h2 className="section-title">Read Further</h2>
        </div>
      </section>

      <section className="section section-costs">
        <div className="section-content">
          <h2 className="section-title">How Much Software Quality Costs?</h2>
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

      <section className="section">
        <div className="section-content">
          <h2 className="section-title">The Ten Key Areas We Measure</h2>
          <img width="100%" src="ten-factors-website/header-factors.svg" alt="Ten Factors Illustration" />
        </div>
      </section>

      <section className="section">
        <div className="section-content">
          <h2 className="section-title">How to Get Started with Ten-Factors</h2>
        </div>
      </section>

      <section className="section">
        <div className="section-content">
          <h2 className="section-title">Frequently Asked Questions (FAQ)</h2>
        </div>
      </section>

      <section className="license">
        <div className="section-content">
          <p className="license-note">
            Ten-Factors is distributed under <a className="link" href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="nofollow noopener noreferrer">Creative Commons License</a>.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
