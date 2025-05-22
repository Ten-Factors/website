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
      <div className="footer-section footer-top">
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

      <div className="footer-section footer-links">
        <div className="footer-column">
          <h4>Platform</h4>
          <ul>
            <li><a href="#">Features</a></li>
            <li><a href="#">Enterprise</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Pricing</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Resources</h4>
          <ul>
            <li><a href="#">Documentation</a></li>
            <li><a href="#">API Reference</a></li>
            <li><a href="#">Guides</a></li>
            <li><a href="#">Status</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Community</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Partners</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Notice</a></li>
            <li><a href="#">Cookie Policy</a></li>
            <li><a href="#">Licenses</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-section footer-bottom">
        <div className="footer-bottom-left">
          <span>© {currentYear} Ten-Factors. All rights reserved.</span>
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
    </footer>
  );
}

export default Footer;
