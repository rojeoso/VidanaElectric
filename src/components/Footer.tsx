function Footer() {
  return (
    <>
      {/* Main Footer */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-content">
            {/* Logo and Company Name */}
            <div className="footer-brand">
              <img src="/logo.png" alt="Vidana Electric" className="footer-logo" />
              <span className="company-name">Vidana Electric</span>
            </div>

            {/* Quick Links */}
            <div className="footer-links">
              <a href="#services" className="footer-link">Services</a>
              <a href="#portfolio" className="footer-link">Our Work</a>
              <a href="#why-choose-us" className="footer-link">Why Choose Us</a>
              <a href="#service-area" className="footer-link">Service Area</a>
              <a href="#contact" className="footer-link">Contact</a>
            </div>

            {/* Contact Information */}
            <div className="footer-contact">
              <a href="tel:254-718-2215" className="footer-link">254-718-2215</a>
              <span className="separator">•</span>
              <a href="mailto:Francisco@vidanaelectric.com" className="footer-link">Francisco@vidanaelectric.com</a>
              <span className="separator">•</span>
              <span className="footer-text">Temple, TX</span>
            </div>

            {/* Copyright */}
            <span className="copyright">© 2025 Vidana Electric</span>
          </div>
        </div>
      </footer>

      <style>{`
        .main-footer {
          background: #1a1a1a;
          color: var(--white);
          padding: var(--space-4) 0;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--space-6);
          flex-wrap: wrap;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }

        .footer-logo {
          width: 35px;
          height: auto;
        }

        .company-name {
          font-size: var(--text-sm);
          font-weight: 700;
          color: var(--white);
          white-space: nowrap;
        }

        .footer-links {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          flex-wrap: wrap;
        }

        .footer-contact {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          flex-wrap: wrap;
        }

        .footer-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: var(--text-xs);
          transition: color 0.3s ease;
          white-space: nowrap;
        }

        .footer-link:hover {
          color: #cd0a1b;
        }

        .footer-text {
          color: rgba(255, 255, 255, 0.7);
          font-size: var(--text-xs);
          white-space: nowrap;
        }

        .separator {
          color: rgba(255, 255, 255, 0.3);
          font-size: var(--text-xs);
        }

        .copyright {
          color: rgba(255, 255, 255, 0.4);
          font-size: var(--text-xs);
          white-space: nowrap;
        }

        @media (max-width: 1024px) {
          .footer-content {
            flex-direction: column;
            gap: var(--space-3);
            text-align: center;
          }

          .footer-links,
          .footer-contact {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .main-footer {
            padding: var(--space-3) 0;
          }

          .footer-links {
            flex-direction: column;
            gap: var(--space-2);
          }
        }
      `}</style>
    </>
  );
}

export default Footer;