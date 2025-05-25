import React, { useState } from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log('Subscribe:', email);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer-section footer-links">
        <div className="footer-section-content">
          <div className="footer-newsletter">
            <h3>Subscribe to Our Newsletter</h3>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
          <div className="footer-social">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-section footer-navigation">
        <div className="footer-section-content">
          <div className="footer-column">
            <h4>About</h4>
            <ul>
              <li><a href="#">Advantages</a></li>
              <li><a href="#">Process</a></li>
              <li><a href="#">Comparison</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Articles</h4>
            <ul>
              <li><a href="#">Article One</a></li>
              <li><a href="#">Article Two</a></li>
              <li><a href="#">Article Three</a></li>
              <li><a href="#">Article Four</a></li>
              <li><a href="#">Article Five</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Success Stories</h4>
            <ul>
              <li><a href="#">Case One</a></li>
              <li><a href="#">Case Two</a></li>
              <li><a href="#">Case Three</a></li>
              <li><a href="#">Case Four</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Consulting</h4>
            <ul>
              <li><a href="#">Expert Review One</a></li>
              <li><a href="#">Expert Review Two</a></li>
              <li><a href="#">Expert Review Three</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>About</h4>
            <ul>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-section footer-copyright">
        <div className="footer-section-content">
          <div className="footer-bottom-left">
            <span>© 2021–{currentYear} Ten-Factors. All rights reserved.</span>
            <span>
              Ten-Factors is distributed under&nbsp;
              <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="nofollow noopener noreferrer">
                Creative Commons License
              </a>
            </span>
          </div>
          <div className="footer-bottom-right">
            <a href="#">Cookie Declaration</a>
            <span className="separator">/</span>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
