import { useState, FormEvent, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [serviceType, setServiceType] = useState<'commercial' | 'residential' | ''>('');
  const addressInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!apiKey) return;

    const initializeAutocomplete = () => {
      if (!addressInputRef.current) return;
      if (!window.google?.maps?.places) return;

      try {
        const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
          types: ['address'],
          componentRestrictions: { country: 'us' }
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place.formatted_address && addressInputRef.current) {
            addressInputRef.current.value = place.formatted_address;
          }
        });
      } catch (error) {
        console.error('Error initializing Google Maps autocomplete:', error);
      }
    };

    // Google Maps is already loaded by Area component with Places library
    if (window.google?.maps?.places) {
      initializeAutocomplete();
      return;
    }

    // Wait for Area component to load Google Maps
    const checkGoogleMaps = setInterval(() => {
      if (window.google?.maps?.places) {
        clearInterval(checkGoogleMaps);
        initializeAutocomplete();
      }
    }, 100);

    return () => clearInterval(checkGoogleMaps);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.currentTarget;

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus('success');
      form.reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = {
    phone: "254-718-2215",
    email: "info@vidanaelectric.com",
    address: {
      street: "807 N Central Ave",
      city: "Troy",
      state: "TX",
      zip: "76579"
    },
    hours: {
      weekdays: "Monday - Friday: 7:00 AM - 6:00 PM",
      weekends: "Saturday: 8:00 AM - 4:00 PM",
      emergency: "24/7 Emergency Service Available"
    }
  };

  const commercialServices = [
    "New Installations & System Upgrades",
    "Lighting Design, Retrofits & Maintenance",
    "Electrical Panel & Circuit Expansions",
    "Emergency Troubleshooting & Repairs",
    "Code Compliance & Safety Inspections"
  ];

  const residentialServices = [
    "Panel Upgrades & Circuit Expansions",
    "Lighting Installation (Indoor & Outdoor)",
    "EV Charger Installations",
    "Whole-Home Rewiring & Remodel Projects",
    "Backup Generator Systems",
    "Code Compliance & Safety Inspections"
  ];

  const getAvailableServices = () => {
    if (serviceType === 'commercial') return commercialServices;
    if (serviceType === 'residential') return residentialServices;
    return [];
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-layout">
          {/* Left side - Contact Information */}
          <div className="contact-info">
            <div className="info-header">
              <div className="info-accent"></div>
              <div className="info-text-wrapper">
                <h2 className="info-title">Get In Touch Today</h2>
                <p className="info-subtitle">
                  Ready to start your electrical project? Contact Vidana Electric for a free estimate and experience the difference 50+ years of expertise makes.
                </p>
              </div>
            </div>

            <div className="contact-details">
              <div className="detail-item">
                <div className="detail-icon">
                  <svg viewBox="0 0 24 24" className="icon-svg">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#cd0a1b"/>
                  </svg>
                </div>
                <div className="detail-content">
                  <h4 className="detail-label">Phone</h4>
                  <a href={`tel:${contactInfo.phone}`} className="detail-value phone-link">
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <svg viewBox="0 0 24 24" className="icon-svg">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#cd0a1b"/>
                  </svg>
                </div>
                <div className="detail-content">
                  <h4 className="detail-label">Email</h4>
                  <a href="mailto:Francisco@vidanaelectric.com" className="detail-value phone-link">
                    Francisco@vidanaelectric.com
                  </a>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <svg viewBox="0 0 24 24" className="icon-svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#cd0a1b"/>
                  </svg>
                </div>
                <div className="detail-content">
                  <h4 className="detail-label">Address</h4>
                  <div className="detail-value">
                    {contactInfo.address.street}<br />
                    {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zip}
                  </div>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <svg viewBox="0 0 24 24" className="icon-svg">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="#cd0a1b"/>
                  </svg>
                </div>
                <div className="detail-content">
                  <h4 className="detail-label">Hours</h4>
                  <div className="detail-value">
                    {contactInfo.hours.weekdays}<br />
                    {contactInfo.hours.weekends}<br />
                    <span className="emergency-hours">{contactInfo.hours.emergency}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-cta">
              <h3 className="cta-title">Need Emergency Service?</h3>
              <p className="cta-description">
                Electrical emergencies can't wait. Call us now for immediate assistance.
              </p>
              <a href={`tel:${contactInfo.phone}`} className="emergency-button">
                CALL NOW: {contactInfo.phone}
              </a>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <div className="contact-form-section">
            <div className="form-header">
              <div className="form-accent"></div>
              <div className="form-text-wrapper">
                <h3 className="form-title">Request Your Free Estimate</h3>
                <p className="form-subtitle">
                  Fill out the form below and we'll get back to you within 24 hours with a detailed estimate.
                </p>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="serviceType" className="form-label">Service Type *</label>
                <select
                  id="serviceType"
                  name="serviceType"
                  className="form-select"
                  required
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as 'commercial' | 'residential' | '')}
                >
                  <option value="">Select service type...</option>
                  <option value="commercial">Commercial</option>
                  <option value="residential">Residential</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="service" className="form-label">Service Needed *</label>
                <select
                  id="service"
                  name="service"
                  className="form-select"
                  required
                  disabled={!serviceType}
                >
                  <option value="">
                    {serviceType ? 'Select a service...' : 'Please select service type first'}
                  </option>
                  {getAvailableServices().map((service, index) => (
                    <option key={index} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="address" className="form-label">Property Address</label>
                <input
                  ref={addressInputRef}
                  type="text"
                  id="address"
                  name="address"
                  className="form-input"
                  placeholder="Start typing your address..."
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Project Details</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  rows={5}
                  placeholder="Please describe your electrical project or issue in detail..."
                ></textarea>
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="checkbox-text">
                    I agree to receive communications from Vidana Electric regarding my estimate request.
                  </span>
                </label>
              </div>

              {submitStatus === 'success' && (
                <div className="form-message form-success">
                  Thank you! Your estimate request has been sent. We'll get back to you within 24 hours.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="form-message form-error">
                  Sorry, there was an error sending your request. Please try again or call us directly.
                </div>
              )}

              <button type="submit" className="form-submit" disabled={isSubmitting}>
                <span>{isSubmitting ? 'Sending...' : 'Get My Free Estimate'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .contact {
          background: #2a2a2a;
          background-image:
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              rgba(255, 255, 255, 0.02) 20px,
              rgba(255, 255, 255, 0.02) 21px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 20px,
              rgba(255, 255, 255, 0.02) 20px,
              rgba(255, 255, 255, 0.02) 21px
            );
          padding: var(--space-24) 0;
        }

        .contact .container {
          max-width: 1400px;
        }

        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-16);
          align-items: stretch;
        }

        .contact-info {
          background: var(--white);
          padding: var(--space-12);
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
        }

        .info-header {
          margin-bottom: var(--space-10);
          display: flex;
          gap: var(--space-4);
        }

        .info-accent {
          width: 4px;
          min-height: 100%;
          background: #cd0a1b;
          flex-shrink: 0;
        }

        .info-text-wrapper {
          flex: 1;
        }

        .info-title {
          font-size: var(--text-2xl);
          font-weight: 700;
          line-height: 1.2;
          color: #1a1a1a;
          margin-bottom: var(--space-4);
        }

        .info-subtitle {
          color: #666;
          line-height: 1.7;
          font-size: var(--text-lg);
          margin: 0;
        }

        .contact-details {
          margin-bottom: var(--space-10);
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          margin-bottom: var(--space-8);
          padding-bottom: var(--space-6);
          border-bottom: 1px solid #e5e7eb;
        }

        .detail-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }

        .detail-icon {
          width: 48px;
          height: 48px;
          background: rgba(205, 10, 27, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .icon-svg {
          width: 24px;
          height: 24px;
        }

        .detail-content {
          flex: 1;
        }

        .detail-label {
          font-size: var(--text-sm);
          font-weight: 700;
          color: #cd0a1b;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: var(--space-2);
        }

        .detail-value {
          color: #1a1a1a;
          font-size: var(--text-base);
          line-height: 1.5;
        }

        .phone-link {
          color: #1a1a1a;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .phone-link:hover {
          color: #cd0a1b;
        }

        .emergency-hours {
          color: #dc2626;
          font-weight: 600;
        }

        .contact-cta {
          background: linear-gradient(135deg, #cd0a1b 0%, #b91c1c 100%);
          padding: var(--space-8);
          border-radius: 8px;
          color: var(--white);
          text-align: center;
        }

        .cta-title {
          font-size: var(--text-xl);
          font-weight: 700;
          margin-bottom: var(--space-4);
          color: var(--white);
        }

        .cta-description {
          margin-bottom: var(--space-6);
          line-height: 1.6;
          color: var(--white);
        }

        .emergency-button {
          background: var(--white);
          color: #cd0a1b;
          padding: 16px 32px;
          text-decoration: none;
          font-weight: 700;
          font-size: 16px;
          border-radius: 0;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: 'Proxima Nova', -apple-system, BlinkMacSystemFont, sans-serif;
          position: relative;
          overflow: hidden;
          letter-spacing: 0.5px;
        }

        .emergency-button:hover {
          background: var(--white);
          color: #cd0a1b;
          transform: none;
          text-shadow:
            0 0 1px rgba(205, 10, 27, 0.3),
            0 0 2px rgba(205, 10, 27, 0.2),
            1px 1px 2px rgba(0, 0, 0, 0.1);
        }

        .emergency-button:hover::before {
          content: '';
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          bottom: -1px;
          background: linear-gradient(45deg, transparent 30%, #cd0a1b 50%, transparent 70%);
          border-radius: 2px;
          z-index: -1;
          opacity: 0.08;
        }

        .emergency-button:hover::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            #cd0a1b 30%,
            rgba(205, 10, 27, 0.8) 50%,
            #cd0a1b 70%,
            transparent 100%
          );
          box-shadow: 0 0 1px rgba(205, 10, 27, 0.3);
          opacity: 0.4;
        }

        .contact-form-section {
          background: var(--white);
          padding: var(--space-12);
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
        }

        .form-header {
          margin-bottom: var(--space-10);
          display: flex;
          gap: var(--space-4);
        }

        .form-accent {
          width: 4px;
          min-height: 100%;
          background: #cd0a1b;
          flex-shrink: 0;
        }

        .form-text-wrapper {
          flex: 1;
        }

        .form-title {
          font-size: var(--text-2xl);
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: var(--space-4);
          line-height: 1.2;
        }

        .form-subtitle {
          color: #666;
          line-height: 1.6;
          margin: 0;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4);
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          font-size: var(--text-sm);
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: var(--space-2);
        }

        .form-input,
        .form-select,
        .form-textarea {
          padding: var(--space-3);
          border: 2px solid #e5e7eb;
          border-radius: 4px;
          font-size: var(--text-base);
          transition: border-color 0.3s ease;
          font-family: inherit;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #cd0a1b;
        }

        .form-select:disabled {
          background-color: #f3f4f6;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .checkbox-group {
          flex-direction: row;
          align-items: flex-start;
          gap: var(--space-3);
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
          cursor: pointer;
          font-size: var(--text-sm);
          line-height: 1.5;
        }

        .form-checkbox {
          width: 18px;
          height: 18px;
          margin: 0;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .checkbox-text {
          color: #666;
        }

        .form-submit {
          background: #cd0a1b;
          color: #ffffff;
          padding: 16px 32px;
          border: none;
          border-radius: 0;
          font-weight: 700;
          font-size: 16px;
          text-transform: none;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: 'Proxima Nova', -apple-system, BlinkMacSystemFont, sans-serif;
          position: relative;
          overflow: hidden;
          align-self: center;
          margin-top: auto;
        }

        .form-submit:hover {
          color: #ffffff;
          background: #cd0a1b;
          transform: none;
          text-shadow:
            0 0 2px #ffffff,
            0 0 4px #ffffff,
            1px 1px 3px rgba(0, 0, 0, 0.6);
        }

        .form-submit:hover::before {
          content: '';
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          bottom: -1px;
          background: linear-gradient(45deg, transparent 30%, #ffffff 50%, transparent 70%);
          border-radius: 2px;
          z-index: -1;
          opacity: 0.15;
        }

        .form-submit:hover::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            #ffffff 30%,
            rgba(255, 255, 255, 0.8) 50%,
            #ffffff 70%,
            transparent 100%
          );
          box-shadow: 0 0 2px rgba(255, 255, 255, 0.4);
          opacity: 0.7;
        }

        .form-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .form-submit:disabled:hover {
          text-shadow: none;
        }

        .form-submit:disabled:hover::before,
        .form-submit:disabled:hover::after {
          display: none;
        }

        .form-message {
          padding: var(--space-4);
          border-radius: 4px;
          font-size: var(--text-sm);
          line-height: 1.5;
          text-align: center;
        }

        .form-success {
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid #22c55e;
          color: #166534;
        }

        .form-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid #ef4444;
          color: #991b1b;
        }

        /* Google Maps Autocomplete Styling */
        .pac-container {
          background-color: #ffffff;
          border: 2px solid #cd0a1b;
          border-radius: 4px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          margin-top: 4px;
          font-family: 'Proxima Nova', -apple-system, BlinkMacSystemFont, sans-serif;
          z-index: 9999;
        }

        .pac-item {
          padding: 10px 12px;
          cursor: pointer;
          border-top: 1px solid #e5e7eb;
          font-size: var(--text-sm);
          line-height: 1.5;
        }

        .pac-item:first-child {
          border-top: none;
        }

        .pac-item:hover {
          background-color: rgba(205, 10, 27, 0.05);
        }

        .pac-item-selected {
          background-color: rgba(205, 10, 27, 0.1);
        }

        .pac-item-query {
          color: #1a1a1a;
          font-weight: 600;
        }

        .pac-matched {
          color: #cd0a1b;
          font-weight: 700;
        }

        .pac-icon {
          display: none;
        }

        /* Hide Google Maps error messages */
        .pac-container::after {
          display: none !important;
        }

        div[style*="background-color: yellow"] {
          display: none !important;
        }

        .gm-err-container,
        .gm-err-content,
        .gm-err-message {
          display: none !important;
        }

        @media (max-width: 1024px) {
          .contact-layout {
            grid-template-columns: 1fr;
            gap: var(--space-12);
          }
        }

        @media (max-width: 768px) {
          .contact {
            padding: var(--space-16) 0;
          }

          .contact-info,
          .contact-form-section {
            padding: var(--space-8);
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: var(--space-6);
          }

          .info-title {
            font-size: clamp(1.8rem, 6vw, 2.5rem);
          }

          .form-title {
            font-size: var(--text-xl);
          }
        }

        @media (max-width: 480px) {
          .contact-info,
          .contact-form-section {
            padding: var(--space-6);
          }

          .detail-item {
            flex-direction: column;
            text-align: center;
            gap: var(--space-3);
          }

          .form-submit {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}

export default Contact;