import './App.css';

function App() {
  return (
    <div className="App">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Ten-Factors</h1>
            <h2 className="hero-subtitle">Community-Driven and Open-Source Standard for Measuring Software Quality</h2>
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
            <button className="cta-button">Get Started</button>
          </div>
          <div className="hero-image">
            {/* Background image will be added here */}
          </div>
        </div>
      </section>

      <section className="section section-case-studies">
        <div className="section-content">
          <h2 className="section-title">Case Studies</h2>
          <p className="section-subtitle">
            Discover how Ten-Factors has transformed software quality for companies of different sizes and industries.
          </p>
          <div className="case-studies-content">
            {/* Case studies content will go here */}
          </div>
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

      <section className="license">
        <div className="section-content">
          <p className="license-note">
            Ten-Factors is distributed under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="nofollow noopener noreferrer">Creative Commons License</a>.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
