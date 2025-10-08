import { useState, useEffect } from 'react'

function Portfolio() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [selectedGroup, setSelectedGroup] = useState('commercial')
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

    const element = document.querySelector('.projects')
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  const handleCardClick = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index)
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setExpandedCard(null)
    }
  }
  const commercialProjects = [
    {
      title: "Commercial Electrical Panel Installation",
      description: "Professional electrical panel installation and upgrade for commercial facilities, ensuring reliable power distribution and compliance with all safety standards and local electrical codes.",
      image: "/portfolio/Commercial-Panels.jpg"
    },
    {
      title: "Commercial Electrical Panel Upgrade",
      description: "Complete electrical panel modernization for commercial properties, featuring upgraded circuit breakers, improved power distribution, and enhanced safety features for business operations.",
      image: "/portfolio/Commercial-Panels (2).jpg"
    },
    {
      title: "Commercial Park Lighting Installation",
      description: "Professional outdoor lighting installation for commercial parks and recreational facilities, providing enhanced safety, security, and aesthetic appeal with energy-efficient LED lighting systems.",
      image: "/portfolio/Commercial-ParkLights.jpg"
    },
    {
      title: "Commercial Street Light Installation",
      description: "Municipal and commercial street lighting projects featuring high-efficiency LED fixtures, smart controls, and professional installation to improve public safety and reduce energy costs.",
      image: "/portfolio/Commercial-StreetLights.jpg"
    },
    {
      title: "Commercial Building Wiring Systems",
      description: "Comprehensive commercial wiring installation and upgrades, including data cabling, power distribution, and specialized electrical systems for modern business environments.",
      image: "/portfolio/Commercial-Wiring.JPG"
    },
    {
      title: "Data Center Electrical Infrastructure",
      description: "Complete electrical infrastructure design and installation for a new 10,000 sq ft data center, featuring redundant power systems, precision cooling electrical, and advanced monitoring systems.",
      image: "/portfolio/Commercial-Panels.jpg"
    }
  ];

  const residentialProjects = [
    {
      title: "Residential Lighting Installation",
      description: "Professional residential lighting installation featuring modern fixtures, energy-efficient LED systems, and custom lighting design to enhance your home's comfort and ambiance.",
      image: "/portfolio/Residential-Lighting.jpg"
    },
    {
      title: "Residential Lighting Upgrade",
      description: "Complete residential lighting upgrades including fixture replacement, dimmer switches, and smart lighting controls for improved functionality and energy efficiency.",
      image: "/portfolio/Residential-Lighting (2).jpg"
    },
    {
      title: "Residential Light Fixture Upgrade",
      description: "High-quality light fixture upgrades and replacements for residential homes, featuring modern designs and energy-efficient lighting solutions throughout living spaces.",
      image: "/portfolio/Residential-LightUpgrade.jpg"
    },
    {
      title: "New Home Construction Electrical",
      description: "Complete electrical installation for new residential construction projects, including full home wiring, panel installation, and modern electrical systems from foundation to finish.",
      image: "/portfolio/Residential-NewBuild.jpg"
    },
    {
      title: "New Build Electrical Installation",
      description: "Professional electrical installation for new home construction featuring complete wiring systems, electrical panels, outlet installation, and modern safety features.",
      image: "/portfolio/Residential-Newbuild (2).jpg"
    },
    {
      title: "Residential Electrical Panel Upgrade",
      description: "Professional residential electrical panel upgrades and replacements, ensuring your home's electrical system meets current safety standards and power demands.",
      image: "/portfolio/Residential-Panel.jpg"
    }
  ];

  const currentProjects = selectedGroup === 'commercial' ? commercialProjects : residentialProjects;

  return (
    <section className="projects">
      <div className="projects-full-container">
        {/* Section header */}
        <div className="section-header">
          <div className="section-header-content">
            <div className="with-pre-title with-circuit">
              <span className="pre-title">OUR WORK</span>
              <div
                key={animationKey}
                className={`circuit-accent circuit-gold ${animationKey > 0 ? 'circuit-active' : ''}`}
              ></div>
              <h2 className="section-title">EMPOWERED<br />PROJECTS</h2>
            </div>
          </div>
        </div>

        {/* Project type toggle buttons */}
        <div className="project-toggle-container">
          <div className="project-toggle-buttons">
            <button
              className={`toggle-btn ${selectedGroup === 'commercial' ? 'active' : ''}`}
              onClick={() => setSelectedGroup('commercial')}
            >
              Commercial
            </button>
            <button
              className={`toggle-btn ${selectedGroup === 'residential' ? 'active' : ''}`}
              onClick={() => setSelectedGroup('residential')}
            >
              Residential
            </button>
          </div>
        </div>

        {/* Projects grid */}
        <div className="projects-grid">
          {currentProjects.map((project, index) => (
            <div
              key={index}
              className={`card card--project ${expandedCard === index ? 'expanded' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              <div className="card__image card__image--project">
                <img src={project.image} alt={project.title} />
                <div className="card__overlay">
                  <h3 className="card__hover-title">{project.title}</h3>
                  <div className="card__magnify-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="M21 21l-4.35-4.35"/>
                    </svg>
                  </div>
                </div>
              </div>
              {expandedCard === index && (
                <div className="card__content">
                  <div className="project-description">
                    <p>{project.description}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Overlay for expanded card */}
        {expandedCard !== null && (
          <div className="modal-overlay" onClick={handleOverlayClick}></div>
        )}
      </div>

      <style>{`
        .projects {
          background: #1a1a1a;
          background-image:
            linear-gradient(0deg, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 50px 50px;
          padding: var(--space-16) 0 var(--space-24) 0;
          position: relative;
        }

        .projects-full-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--space-6);
        }

        .section-header {
          margin-bottom: 0;
        }

        .section-header-content {
          display: flex;
          justify-content: flex-start;
          align-items: flex-end;
          margin-bottom: var(--space-8);
        }

        .project-toggle-container {
          margin-bottom: var(--space-8);
          display: flex;
          justify-content: center;
        }

        .project-toggle-buttons {
          display: flex;
          gap: 0;
          border-radius: 0;
          overflow: hidden;
          border: 2px solid var(--white);
        }

        .toggle-btn {
          border: none;
          padding: 16px 32px;
          font-weight: 700;
          font-size: 16px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 140px;
          font-family: 'Proxima Nova', -apple-system, BlinkMacSystemFont, sans-serif;
          position: relative;
          overflow: hidden;
        }

        .toggle-btn:first-child {
          background: transparent;
          color: var(--primary-red);
          border-right: 1px solid var(--white);
        }

        .toggle-btn:last-child {
          background: var(--black);
          color: var(--primary-gold);
        }

        .toggle-btn:first-child:hover {
          background: var(--primary-red);
          color: var(--white);
          text-shadow:
            0 0 2px var(--white),
            0 0 4px var(--white),
            1px 1px 3px rgba(0, 0, 0, 0.6);
        }

        .toggle-btn:last-child:hover {
          background: var(--black);
          color: var(--primary-gold);
          text-shadow:
            0 0 2px var(--primary-gold),
            0 0 4px var(--primary-gold),
            1px 1px 3px rgba(0, 0, 0, 0.6);
        }

        .toggle-btn:first-child:hover::before {
          content: '';
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          bottom: -1px;
          background: linear-gradient(45deg, transparent 30%, var(--white) 50%, transparent 70%);
          border-radius: 2px;
          z-index: -1;
          opacity: 0.15;
        }

        .toggle-btn:last-child:hover::before {
          content: '';
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          bottom: -1px;
          background: linear-gradient(45deg, transparent 30%, var(--primary-gold) 50%, transparent 70%);
          border-radius: 2px;
          z-index: -1;
          opacity: 0.15;
        }

        .toggle-btn:first-child:hover::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            var(--white) 30%,
            rgba(255, 255, 255, 0.8) 50%,
            var(--white) 70%,
            transparent 100%
          );
          box-shadow: 0 0 2px rgba(255, 255, 255, 0.4);
          opacity: 0.7;
        }

        .toggle-btn:last-child:hover::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            var(--primary-gold) 30%,
            rgba(240, 148, 29, 0.8) 50%,
            var(--primary-gold) 70%,
            transparent 100%
          );
          box-shadow: 0 0 2px rgba(240, 148, 29, 0.4);
          opacity: 0.7;
        }

        .toggle-btn:first-child.active {
          background: var(--primary-red);
          color: var(--white);
        }

        .toggle-btn:last-child.active {
          background: var(--black);
          color: var(--primary-gold);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-8);
          margin-bottom: var(--space-8);
        }

        .card--project {
          display: flex;
          flex-direction: column;
        }

        .with-pre-title {
          position: relative;
        }

        .with-circuit {
          padding-left: 60px;
          position: relative;
        }

        .with-lightning {
          padding-left: 60px;
        }

        .projects .pre-title {
          font-size: 1.6rem;
          color: var(--primary-gold);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          display: block;
          margin-bottom: var(--space-4);
        }


        .projects .section-title {
          font-size: clamp(4rem, 8vw, 6rem);
          font-weight: 900;
          color: var(--white);
          line-height: 1.1;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin: 0 0 var(--space-4) 0;
        }


        .projects-container {
          flex: 1;
          padding: 0;
          overflow: hidden;
          position: relative;
        }


        .card {
          background: var(--white);
          border-radius: 0;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          border: none;
          min-height: 500px;
          position: relative;
        }

        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
        }

        .card.expanded {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80vw;
          max-width: 800px;
          height: auto;
          max-height: 70vh;
          z-index: 1001;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
          overflow: visible;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.8);
          z-index: 1000;
          cursor: pointer;
        }


        .card__image {
          position: relative;
        }

        .card__image--project {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;
        }

        .card__image--project img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .card__overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 2;
        }

        .card:not(.expanded):hover .card__overlay {
          opacity: 1;
        }

        .card:not(.expanded):hover .card__image--project img {
          filter: brightness(0.4);
          transform: scale(1.05);
        }

        .card__hover-title {
          color: white;
          font-size: clamp(1.25rem, 2.5vw, 1.75rem);
          font-weight: 700;
          text-align: center;
          margin: 0 0 var(--space-4) 0;
          padding: 0 var(--space-4);
          text-transform: uppercase;
          letter-spacing: 1px;
          line-height: 1.2;
        }

        .card__magnify-icon {
          width: 48px;
          height: 48px;
          color: white;
          background: rgba(240, 148, 29, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease, background-color 0.3s ease;
        }

        .card.expanded .card__magnify-icon {
          display: none;
        }

        .card__magnify-icon:hover {
          transform: scale(1.1);
          background: rgba(240, 148, 29, 1);
        }

        .card__magnify-icon svg {
          width: 24px;
          height: 24px;
        }

        .card__image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .card:hover .card__image img {
          transform: scale(1.05);
        }

        .card__content {
          padding: var(--space-6);
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .card__content--top {
          flex: 1;
        }

        .project-title {
          font-size: var(--text-lg);
          font-weight: 600;
          color: #1a1a1a;
          line-height: 1.3;
          margin-bottom: var(--space-4);
          font-family: 'Proxima Nova', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .project-description {
          margin-bottom: var(--space-6);
        }

        .project-description p {
          color: #666;
          line-height: 1.6;
          font-size: var(--text-sm);
          margin: 0;
        }


        .card__cta {
          margin-top: auto;
        }

        .read-more-link {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          color: #ff6b35;
          text-decoration: none;
          font-weight: 700;
          font-size: var(--text-sm);
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
        }

        .read-more-link .button-arrow {
          width: 20px;
          height: 20px;
        }

        .read-more-link:hover {
          color: #dc2626;
        }

        .read-more-link:hover .button-arrow {
          transform: translateX(4px);
        }

        @media (max-width: 1024px) {
          .card {
            width: calc(50% - var(--space-6) / 2);
          }


          .section-header-content {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-6);
          }
        }

        @media (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-6);
          }

          .projects .section-title {
            font-size: clamp(3rem, 6vw, 4rem);
          }
        }

        @media (max-width: 768px) {
          .projects {
            padding: var(--space-16) 0;
          }

          .projects .section-title {
            font-size: clamp(2rem, 8vw, 3rem);
          }

          .projects-full-container {
            padding: 0 var(--space-4);
          }

          .section-header {
            margin-bottom: var(--space-12);
            padding-bottom: var(--space-4);
          }

          .projects-grid {
            grid-template-columns: 1fr;
            gap: var(--space-6);
          }

          .card {
            width: 100%;
            max-width: none;
            min-height: 400px;
          }

          .project-toggle-container {
            position: sticky;
            top: 0;
            z-index: 100;
            background: rgba(26, 26, 26, 0.98);
            padding: var(--space-4) var(--space-4) var(--space-6);
            margin: -20px -20px var(--space-8) -20px;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          }

          .project-toggle-container::before {
            content: '';
            position: absolute;
            top: -50px;
            left: 0;
            right: 0;
            height: 50px;
            background: linear-gradient(to bottom, rgba(26, 26, 26, 1), rgba(26, 26, 26, 0.98));
            z-index: -1;
          }

          .project-toggle-buttons {
            border: 2px solid #f0941d;
            border-radius: 8px;
          }

          .toggle-btn {
            padding: var(--space-3) var(--space-6);
            font-size: var(--text-base);
            font-weight: 600;
          }

          .card__image--project {
            height: 100%;
          }

          .with-circuit {
            padding-left: 0;
          }

          .circuit-accent {
            display: none;
          }

          .card__content {
            padding: var(--space-4);
          }
        }
      `}</style>
    </section>
  );
}

export default Portfolio;