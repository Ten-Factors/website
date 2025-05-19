import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="copyright">
          © {currentYear} Ten-Factors. All rights reserved.
        </p>
        <p className="license-note">
          Ten-Factors is distributed under <a className="link" href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="nofollow noopener noreferrer">Creative Commons License</a>.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
