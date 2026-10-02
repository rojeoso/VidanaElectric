const EFFECTIVE_DATE = 'October 1, 2026';

const contactInfo = {
  phone: '254-718-2215',
  email: 'Francisco@vidanaelectric.com',
  address: {
    street: '807 N Central Ave',
    city: 'Troy',
    state: 'TX',
    zip: '76579'
  }
};

const sections = [
  { id: 'information-we-collect', title: 'Information We Collect' },
  { id: 'how-we-use', title: 'How We Use Your Information' },
  { id: 'third-party-services', title: 'Third-Party Services' },
  { id: 'sharing', title: 'How We Share Information' },
  { id: 'communications', title: 'Calls, Texts & Emails' },
  { id: 'cookies', title: 'Cookies & Tracking' },
  { id: 'retention', title: 'Data Retention' },
  { id: 'security', title: 'Security' },
  { id: 'your-rights', title: 'Your Choices & Rights' },
  { id: 'children', title: "Children's Privacy" },
  { id: 'changes', title: 'Changes to This Policy' },
  { id: 'contact-us', title: 'Contact Us' }
];

function PrivacyPolicy() {
  return (
    <>
      <header className="policy-header">
        <div className="container policy-header-inner">
          <a href="/" className="policy-brand">
            <img src="/logo.png" alt="Vidana Electric" className="policy-logo" />
            <span className="policy-brand-name">Vidana Electric</span>
          </a>
          <a href="/" className="policy-back">← Back to Home</a>
        </div>
      </header>

      <main className="policy">
        <div className="container policy-container">
          <div className="policy-title-block">
            <div className="policy-accent"></div>
            <div>
              <h1 className="policy-title">Privacy Policy</h1>
              <p className="policy-effective">Effective date: {EFFECTIVE_DATE}</p>
            </div>
          </div>

          <p className="policy-intro">
            Vidana Electric ("Vidana Electric," "we," "us," or "our") respects your privacy. This Privacy
            Policy explains what information we collect when you visit our website or request an estimate,
            how we use it, and the choices you have. By using this website, you agree to the practices
            described below.
          </p>

          <nav className="policy-toc" aria-label="Privacy policy sections">
            <h2 className="policy-toc-title">On This Page</h2>
            <ol>
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </nav>

          <section id="information-we-collect" className="policy-section">
            <h2>1. Information We Collect</h2>
            <h3>Information you give us</h3>
            <p>When you fill out our estimate request form, we collect:</p>
            <ul>
              <li>Your first and last name</li>
              <li>Phone number</li>
              <li>Email address (optional)</li>
              <li>The type of service you need (commercial or residential) and the specific service requested</li>
              <li>Property address (optional)</li>
              <li>Project details and any other information you choose to include in your message</li>
            </ul>
            <p>
              We also collect whatever information you share with us when you call, text, or email us directly.
            </p>

            <h3>Information collected automatically</h3>
            <p>
              Our website does not use analytics or advertising trackers. However, like all websites, when your
              browser loads our pages, the servers it connects to (including our web host and the third-party
              services described in Section 3) automatically receive standard technical information such as
              your IP address, browser type, device type, and the date and time of your visit.
            </p>
          </section>

          <section id="how-we-use" className="policy-section">
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your estimate request and answer your questions</li>
              <li>Schedule, perform, and follow up on electrical services</li>
              <li>Prepare estimates, invoices, and project records</li>
              <li>Communicate with you about your request or project</li>
              <li>Operate, maintain, and improve our website</li>
              <li>Comply with legal obligations, permit requirements, and protect our rights</li>
            </ul>
            <p>
              <strong>We do not sell your personal information</strong>, and we do not use it for targeted
              advertising.
            </p>
          </section>

          <section id="third-party-services" className="policy-section">
            <h2>3. Third-Party Services</h2>
            <p>Our website relies on a few trusted service providers to work properly:</p>
            <ul>
              <li>
                <strong>EmailJS</strong> — When you submit our estimate form, the information you entered is
                transmitted through EmailJS so it can be delivered to our email inbox. See the{' '}
                <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">
                  EmailJS Privacy Policy
                </a>.
              </li>
              <li>
                <strong>Google Maps</strong> — We use Google Maps to display our service area and to suggest
                addresses as you type in the property address field. Google may collect information such as
                your IP address and the text you type into that field, and may use cookies, as described in the{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                  Google Privacy Policy
                </a>{' '}
                and the{' '}
                <a href="https://maps.google.com/help/terms_maps/" target="_blank" rel="noopener noreferrer">
                  Google Maps Terms of Service
                </a>.
              </li>
              <li>
                <strong>City of Killeen GIS</strong> — Our service area map loads public county boundary data
                from the City of Killeen's mapping server, which receives standard technical information
                (such as your IP address) when your browser requests that data.
              </li>
            </ul>
            <p>
              These providers process information according to their own privacy policies. We are not
              responsible for the privacy practices of third-party websites or services.
            </p>
          </section>

          <section id="sharing" className="policy-section">
            <h2>4. How We Share Information</h2>
            <p>We only share your information in limited situations:</p>
            <ul>
              <li>
                <strong>Service providers</strong> who help us operate our website and business (such as those
                listed above), only as needed to perform services for us
              </li>
              <li>
                <strong>Permitting and inspection authorities</strong> or utility companies, when required to
                complete your electrical project
              </li>
              <li>
                <strong>Legal requirements</strong> — when required by law, subpoena, or court order, or to
                protect the rights, property, or safety of Vidana Electric, our customers, or others
              </li>
              <li>
                <strong>Business transfers</strong> — if Vidana Electric is sold, merged, or reorganized, customer
                information may be transferred as part of that transaction
              </li>
            </ul>
          </section>

          <section id="communications" className="policy-section">
            <h2>5. Calls, Texts & Emails</h2>
            <p>
              If you request an estimate or contact us, we may call, text, or email you about your request,
              appointment, or project. Message and data rates may apply to text messages. You can ask us to
              stop contacting you at any time by replying STOP to a text message, or by letting us know by
              phone or email.
            </p>
            <p>
              We do not sell or share your phone number or text messaging consent with third parties for
              their marketing purposes.
            </p>
          </section>

          <section id="cookies" className="policy-section">
            <h2>6. Cookies & Tracking</h2>
            <p>
              Vidana Electric does not set its own cookies or use analytics, advertising pixels, or other
              tracking technologies on this website. Google Maps, which is embedded on our site, may set or
              read cookies as described in Google's privacy policy. You can block or delete cookies through
              your browser settings; the website will still work, although the map or address suggestions
              may not.
            </p>
            <p>
              <strong>Do Not Track:</strong> Some browsers offer a "Do Not Track" setting. Because we do not
              track visitors across websites, our site does not change its behavior in response to these
              signals.
            </p>
          </section>

          <section id="retention" className="policy-section">
            <h2>7. Data Retention</h2>
            <p>
              We keep estimate requests and customer information for as long as needed to respond to you,
              complete and warranty our work, keep accurate business and tax records, and meet legal or
              licensing requirements. When information is no longer needed, we delete it or securely dispose
              of it.
            </p>
          </section>

          <section id="security" className="policy-section">
            <h2>8. Security</h2>
            <p>
              We use reasonable administrative, technical, and physical measures to protect your information.
              However, no website, email, or electronic storage is 100% secure, so we cannot guarantee
              absolute security. Please do not include sensitive information such as payment card numbers,
              Social Security numbers, or passwords in our contact form.
            </p>
          </section>

          <section id="your-rights" className="policy-section">
            <h2>9. Your Choices & Rights</h2>
            <p>You may contact us at any time to:</p>
            <ul>
              <li>Ask what personal information we have about you</li>
              <li>Correct inaccurate information</li>
              <li>Request that we delete your information, unless we need to keep it for legal or business record purposes</li>
              <li>Opt out of calls, texts, or emails from us</li>
            </ul>
            <p>
              Depending on where you live, including Texas and California, you may have additional rights
              under state privacy laws. We will respond to verified requests within the time required by
              applicable law, and we will not discriminate against you for exercising your privacy rights.
              To make a request, use the contact information below.
            </p>
          </section>

          <section id="children" className="policy-section">
            <h2>10. Children's Privacy</h2>
            <p>
              Our website and services are intended for adults. We do not knowingly collect personal
              information from children under 13. If you believe a child has provided us with personal
              information, please contact us and we will delete it.
            </p>
          </section>

          <section id="changes" className="policy-section">
            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we will post the updated
              version on this page and change the effective date above. We encourage you to review this
              page periodically.
            </p>
          </section>

          <section id="contact-us" className="policy-section">
            <h2>12. Contact Us</h2>
            <p>If you have questions about this Privacy Policy or want to make a privacy request, contact us:</p>
            <address className="policy-contact">
              <strong>Vidana Electric</strong><br />
              {contactInfo.address.street}<br />
              {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zip}<br />
              Phone: <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a><br />
              Email: <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </address>
          </section>
        </div>
      </main>

      <style>{`
        .policy-header {
          background: #1a1a1a;
          padding: var(--space-4) 0;
          border-bottom: 3px solid #cd0a1b;
        }

        .policy-header-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--space-4);
        }

        .policy-brand {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          text-decoration: none;
        }

        .policy-logo {
          width: 44px;
          height: auto;
        }

        .policy-brand-name {
          color: var(--white);
          font-weight: 700;
          font-size: var(--text-lg);
          white-space: nowrap;
        }

        .policy-back {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: var(--text-sm);
          font-weight: 600;
          white-space: nowrap;
          transition: color 0.3s ease;
        }

        .policy-back:hover {
          color: #cd0a1b;
        }

        .policy {
          background: #2a2a2a;
          padding: var(--space-16) 0 var(--space-24);
        }

        .policy-container {
          max-width: 860px;
        }

        .policy-title-block {
          display: flex;
          align-items: stretch;
          gap: var(--space-4);
          margin-bottom: var(--space-8);
        }

        .policy-accent {
          width: 4px;
          background: #f0941d;
          flex-shrink: 0;
        }

        .policy-title {
          color: var(--white);
          font-size: clamp(var(--text-3xl), 5vw, 3rem);
          margin-bottom: var(--space-2);
        }

        .policy-effective {
          color: rgba(255, 255, 255, 0.6);
          font-size: var(--text-sm);
          margin: 0;
        }

        .policy p,
        .policy li,
        .policy-contact {
          color: rgba(255, 255, 255, 0.8);
          font-size: var(--text-base);
          line-height: 1.7;
        }

        .policy-intro {
          font-size: var(--text-lg);
        }

        .policy a {
          color: #f0941d;
          text-decoration: underline;
          text-underline-offset: 2px;
          overflow-wrap: anywhere;
        }

        .policy a:hover {
          color: #cd0a1b;
        }

        .policy-toc {
          background: #1a1a1a;
          border-left: 3px solid #cd0a1b;
          padding: var(--space-6);
          margin: var(--space-8) 0 var(--space-12);
        }

        .policy-toc-title {
          color: var(--white);
          font-size: var(--text-lg);
          margin-bottom: var(--space-3);
        }

        .policy-toc ol {
          columns: 2;
          column-gap: var(--space-8);
          padding-left: var(--space-6);
          margin: 0;
        }

        .policy-toc li {
          margin-bottom: var(--space-2);
          break-inside: avoid;
        }

        .policy-toc a {
          text-decoration: none;
        }

        .policy-section {
          padding-top: var(--space-8);
          scroll-margin-top: var(--space-4);
        }

        .policy-section h2 {
          color: var(--white);
          font-size: var(--text-2xl);
          margin-bottom: var(--space-4);
          padding-bottom: var(--space-2);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .policy-section h3 {
          color: #f0941d;
          font-size: var(--text-lg);
          margin: var(--space-6) 0 var(--space-3);
        }

        .policy-section ul {
          padding-left: var(--space-6);
          margin-bottom: var(--space-4);
        }

        .policy-section li {
          margin-bottom: var(--space-2);
        }

        .policy strong {
          color: var(--white);
        }

        .policy-contact {
          font-style: normal;
          background: #1a1a1a;
          padding: var(--space-6);
          border-left: 3px solid #f0941d;
        }

        @media (max-width: 768px) {
          .policy {
            padding: var(--space-12) 0 var(--space-16);
          }

          .policy-toc ol {
            columns: 1;
          }

          .policy-brand-name {
            display: none;
          }
        }
      `}</style>
    </>
  );
}

export default PrivacyPolicy;
