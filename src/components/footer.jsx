import React from 'react';
import '../homepage.css';

const Footer = () => {
  return (
    
    <footer className="footer">
      <div className="footer-container">
        {/* Main grid for footer content */}
        <div className="footer-grid">
          {/* Section 1: About the store */}
          <div className="footer-section">
            <h3 className="footer-heading">GameStore</h3>
            <p className="footer-description">
              Your one-stop shop for the latest and greatest video games. Explore a vast collection of titles, from action-packed adventures to strategic simulators.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div className="footer-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-list">
              <li className="footer-list-item">
                <a href="#" className="footer-link">
                  About Us
                </a>
              </li>
              <li className="footer-list-item">
                <a href="#" className="footer-link">
                  Contact
                </a>
              </li>
              <li className="footer-list-item">
                <a href="#" className="footer-link">
                  Privacy Policy
                </a>
              </li>
              <li className="footer-list-item">
                <a href="#" className="footer-link">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Section 3: Categories */}
          <div className="footer-section">
            <h3 className="footer-heading">Categories</h3>
            <ul className="footer-list">
              <li className="footer-list-item">
                <a href="#" className="footer-link">
                  Action
                </a>
              </li>
              <li className="footer-list-item">
                <a href="#" className="footer-link">
                  RPG
                </a>
              </li>
              <li className="footer-list-item">
                <a href="#" className="footer-link">
                  Strategy
                </a>
              </li>
              <li className="footer-list-item">
                <a href="#" className="footer-link">
                  Simulation
                </a>
              </li>
            </ul>
          </div>

          {/* Section 4: Social Media */}
          <div className="footer-section">
            <h3 className="footer-heading">Follow Us</h3>
            <div className="social-links">
              <a href="#" aria-label="Twitter" className="social-link">
                <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.25c8.73 0 13.47-7.24 13.47-13.47 0-.21 0-.42-.01-.63a9.66 9.66 0 002.26-2.34 9.4 9.4 0 01-2.6.72 4.71 4.71 0 002.04-2.5 9.42 9.42 0 01-3.05 1.16 4.7 4.7 0 00-8.03 4.29A13.35 13.35 0 012.35 4.3c-.5 1.25-.8 2.65-.8 4.14 0 2.89 1.47 5.43 3.73 6.9A4.7 4.7 0 011.64 13c.01.03.02.05.03.07a4.67 4.67 0 01-2.12-.58c0 1.25.4 2.45 1.08 3.48a4.68 4.68 0 01-1.12 1.34c.03.03.06.06.09.09a9.38 9.38 0 002.43 1.13 13.36 13.36 0 01-1.63 2.14 4.7 4.7 0 001.37 1.25c.82.82 1.95 1.32 3.2 1.32a9.42 9.42 0 01-5.63-1.92A13.35 13.35 0 01.3 20.25h12.3c-.04.14-.09.28-.14.42a4.7 4.7 0 00-1.87 2.2c-.44 1.1-.64 2.2-.64 3.32 0 1.13.2 2.23.64 3.32a4.7 4.7 0 001.87 2.2c.5.21.99.31 1.47.31s.97-.1 1.47-.31a4.7 4.7 0 001.87-2.2c.44-1.1.64-2.2.64-3.32 0-1.13-.2-2.23-.64-3.32a4.7 4.7 0 00-1.87-2.2c-.5-.21-.99-.31-1.47-.31s-.97.1-1.47.31a4.7 4.7 0 00-1.87 2.2c-.44 1.1-.64 2.2-.64 3.32 0 1.13.2 2.23.64 3.32a4.7 4.7 0 001.87 2.2c.5.21.99.31 1.47.31s.97-.1 1.47-.31a4.7 4.7 0 001.87-2.2c.44-1.1.64-2.2.64-3.32 0-1.13-.2-2.23-.64-3.32a4.7 4.7 0 00-1.87-2.2z" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="social-link">
                <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.96 3.65 9.09 8.44 9.87v-7.14h-2.54V12h2.54V9.36c0-2.51 1.53-3.88 3.78-3.88 1.08 0 2.01.08 2.28.12v2.5h-1.48c-1.2 0-1.44.57-1.44 1.42V12h2.89l-.47 2.91h-2.42v7.14C18.35 21.09 22 16.96 22 12z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="social-link">
                <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2c2.71 0 3.05.01 4.12.06 1.07.05 1.6.19 2.18.42.58.24 1.06.57 1.54 1.05.48.48.81.96 1.05 1.54.23.58.37 1.11.42 2.18.05 1.07.06 1.41.06 4.12s-.01 3.05-.06 4.12c-.05 1.07-.19 1.6-.42 2.18-.24.58-.57 1.06-1.05 1.54-.48.48-.96.81-1.54 1.05-.58.23-1.11.37-2.18.42-1.07.05-1.41.06-4.12.06s-3.05-.01-4.12-.06c-1.07-.05-1.6-.19-2.18-.42-.58-.24-1.06-.57-1.54-1.05-.48-.48-.81-.96-1.05-1.54-.23-.58-.37-1.11-.42-2.18-.05-1.07-.06-1.41-.06-4.12s.01-3.05.06-4.12c.05-1.07.19-1.6.42-2.18.24-.58.57-1.06 1.05-1.54.48-.48.96-.81 1.54-1.05.58-.23 1.11-.37 2.18-.42C8.95 2.01 9.29 2 12 2zm0 2.2c-2.67 0-2.98.01-4.04.06-1.06.05-1.44.18-1.89.36-.45.18-.79.4-1.13.74-.34.34-.56.68-.74 1.13-.18.45-.31.83-.36 1.89-.05 1.06-.06 1.37-.06 4.04s.01 2.98.06 4.04c.05 1.06.18 1.44.36 1.89.18.45.4.79.74 1.13.34.34.68.56 1.13.74.45.18.83.31 1.89.36 1.06.05 1.37.06 4.04.06s2.98-.01 4.04-.06c1.06-.05 1.44-.18 1.89-.36.45-.18.79-.4 1.13-.74.34-.34.56-.68.74-1.13.18-.45.31-.83.36-1.89.05-1.06.06-1.37.06-4.04s-.01-2.98-.06-4.04c-.05-1.06-.18-1.44-.36-1.89-.18-.45-.4-.79-.74-1.13-.34-.34-.68-.56-1.13-.74-.45-.18-.83-.31-1.89-.36C14.98 4.21 14.67 4.2 12 4.2zm0 4.8c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8.2c-1.76 0-3.2-1.44-3.2-3.2s1.44-3.2 3.2-3.2 3.2 1.44 3.2 3.2-1.44 3.2-3.2 3.2zm6.2-7.2c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className="footer-bottom">
          <p className="copyright">&copy; 2024 GameStore. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
