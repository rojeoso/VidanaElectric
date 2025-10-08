import { useEffect, useState } from 'react'

function WhyChooseUs() {
  const [animationKey, setAnimationKey] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Increment key to force re-animation
            setAnimationKey(prev => prev + 1)
          }
        })
      },
      { threshold: 0.3 }
    )

    const element = document.querySelector('.why-choose-us')
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])
  const reasons = [
    {
      title: "50+ Years of Experience",
      description: "Over five decades of trusted electrical services in Central Texas, building a reputation for reliability and expertise that spans generations."
    },
    {
      title: "Family-Owned & Operated",
      description: "As a family business, we treat every customer like family, providing personalized service with the care and attention you deserve."
    },
    {
      title: "Licensed & Insured",
      description: "Fully licensed electrical contractors with comprehensive insurance coverage, ensuring your project is protected from start to finish."
    },
    {
      title: "24/7 Emergency Service",
      description: "Electrical emergencies don't wait for business hours. We're available around the clock to restore power and safety to your property."
    },
    {
      title: "Transparent Pricing",
      description: "No surprises or hidden fees. We provide detailed estimates upfront so you know exactly what to expect before work begins."
    },
    {
      title: "Quality Guarantee",
      description: "We stand behind our work with comprehensive warranties, ensuring your electrical systems perform reliably for years to come."
    }
  ];

  return (
    <section className="why-choose-us">
      <div className="container">
        <div className="section-layout">
          <div className="section-content">
            <div className="with-pre-title with-circuit">
              <span className="pre-title">WHY CHOOSE US</span>
              <div
                key={animationKey}
                className={`circuit-accent circuit-red ${animationKey > 0 ? 'circuit-active' : ''}`}
              ></div>
              <div className="scroll-section">
                <h2 className="section-title">Building Trust Through Excellence</h2>
                <div className="mt-5">
                  <h3 className="interest-title">READY TO EXPERIENCE THE VIDANA DIFFERENCE?</h3>
                  <a href="#contact" className="cta-button">
                    <span>Free Estimate</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="expandable-sections">
            {reasons.map((reason, index) => (
              <div key={index} className="expandable-item">
                <button className="toggle-button" aria-expanded="false" aria-haspopup="true">
                  <span className="sr-only">Expand Section {reason.title}</span>
                </button>
                <h3 className="item-title">{reason.title}</h3>
                <div className="expand">
                  <p><strong>{reason.description}</strong></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .why-choose-us {
          background: linear-gradient(135deg, #ffffff 0%, #e8e8e8 50%, #d0d0d0 100%);
          background-image:
            linear-gradient(135deg, #ffffff 0%, #e8e8e8 50%, #d0d0d0 100%),
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 40px,
              rgba(0, 0, 0, 0.03) 40px,
              rgba(0, 0, 0, 0.03) 42px
            );
          color: var(--black);
          padding: var(--space-24) 0;
          position: relative;
        }

        .section-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-16);
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--space-6);
        }

        .section-content {
          position: relative;
        }

        .with-pre-title {
          position: relative;
        }

        .with-circuit {
          padding-left: 60px;
          position: relative;
        }

        .pre-title {
          font-size: 1.6rem;
          color: var(--primary-red);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          display: block;
          margin-bottom: var(--space-4);
        }


        .scroll-section {
          transform: none;
        }

        .section-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 900;
          color: var(--black);
          line-height: 1.1;
          margin-bottom: var(--space-6);
        }


        .mt-5 {
          margin-top: var(--space-8);
        }

        .interest-title {
          font-size: var(--text-base);
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: var(--space-4);
          text-transform: uppercase;
          letter-spacing: 1px;
        }


        .expandable-sections {
          display: flex;
          flex-direction: column;
        }

        .expandable-item {
          min-height: 120px;
          border-bottom: 1px solid #e5e7eb;
          position: relative;
          padding: var(--space-4) 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .expandable-item:last-child {
          border-bottom: none;
        }

        .toggle-button {
          position: absolute;
          top: var(--space-4);
          right: var(--space-4);
          background: none;
          border: none;
          color: #1a1a1a;
          cursor: pointer;
          padding: var(--space-2);
          font-size: 1.2rem;
        }

        .toggle-button::before {
          content: "+";
          display: block;
          font-weight: bold;
          transition: transform 0.3s ease;
        }

        .toggle-button[aria-expanded="true"]::before {
          content: "−";
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .item-title {
          font-size: var(--text-xl);
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: var(--space-4);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .expand {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          opacity: 0;
        }

        .expandable-item:hover {
          min-height: 180px;
        }

        .expandable-item:hover .expand {
          max-height: 120px;
          opacity: 1;
        }

        .expand p {
          color: rgba(26, 26, 26, 0.8);
          line-height: 1.6;
          margin: 0;
          padding-right: var(--space-8);
        }

        .expand strong {
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .section-layout {
            grid-template-columns: 1fr;
            gap: var(--space-12);
          }

          .expandable-item {
            min-height: 100px;
          }
        }

        @media (max-width: 768px) {
          .why-choose-us {
            padding: var(--space-16) 0;
          }

          .with-circuit {
            padding-left: 0;
          }

          .circuit-accent {
            display: none;
          }

          .section-title {
            font-size: clamp(2rem, 8vw, 3rem);
          }

          .expandable-item {
            padding: var(--space-4) 0;
          }

          .expand p {
            padding-right: 0;
          }
        }
      `}</style>
    </section>
  );
}

export default WhyChooseUs;