import { useEffect, useState } from 'react'

function Services() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const updateScrollAndViewport = () => {
      setScrollY(window.scrollY)
    }

    // Initial setup
    updateScrollAndViewport()

    window.addEventListener('scroll', updateScrollAndViewport)
    window.addEventListener('resize', updateScrollAndViewport)

    return () => {
      window.removeEventListener('scroll', updateScrollAndViewport)
      window.removeEventListener('resize', updateScrollAndViewport)
    }
  }, [])

  // Calculate movement distance for titles
  const getTitleMovement = (sectionSelector: string) => {
    const sectionElement = document.querySelector(sectionSelector)
    if (!sectionElement) return 0

    const rect = sectionElement.getBoundingClientRect()
    const sectionTop = window.scrollY + rect.top
    const sectionHeight = rect.height

    // Calculate how far we've scrolled into the section
    const scrollIntoSection = scrollY - sectionTop

    // Ensure we don't start moving until section is in view
    if (scrollIntoSection < 0) return 0

    // Calculate maximum movement: section height minus title height and padding
    const titleHeight = 150 // Approximate title height
    const padding = 100 // Padding from bottom of section
    const maxMovement = sectionHeight - titleHeight - padding

    // Title should move to stay at top of viewport when section scrolls past
    const topOffset = 50 // Small offset from very top of viewport
    let movement = 0

    if (rect.top <= topOffset) {
      // Section has scrolled past top, move title to stay visible
      movement = Math.abs(rect.top) + topOffset
    }

    // Ensure movement doesn't exceed section boundaries
    return Math.max(0, Math.min(movement, maxMovement))
  }

  const commercialMovement = getTitleMovement('.commercial-section')
  const residentialMovement = getTitleMovement('.residential-section')

  const commercialServices = [
    {
      title: "NEW INSTALLATIONS & SYSTEM UPGRADES",
      description: "Professional electrical installations and system upgrades for commercial properties, ensuring reliable power distribution and modern electrical infrastructure.",
      image: "/Services Pictures/ElectricianAtPanel.jpg"
    },
    {
      title: "LIGHTING DESIGN, RETROFITS & MAINTENANCE",
      description: "Comprehensive commercial lighting solutions including energy-efficient LED retrofits, custom lighting design, and ongoing maintenance services.",
      image: "/Services Pictures/CommercialLighting (3).jpg"
    },
    {
      title: "ELECTRICAL PANEL & CIRCUIT EXPANSIONS",
      description: "Professional panel upgrades and circuit expansions to meet growing electrical demands and ensure code compliance for commercial facilities.",
      image: "/Services Pictures/OutdoorPanel.jpg"
    },
    {
      title: "EMERGENCY TROUBLESHOOTING & REPAIRS",
      description: "24/7 emergency electrical services for commercial properties, providing rapid response for electrical faults and power restoration.",
      image: "/Services Pictures/ElectriciansOnWires.jpg"
    },
    {
      title: "CODE COMPLIANCE & SAFETY INSPECTIONS",
      description: "Thorough electrical inspections and code compliance assessments to ensure your commercial electrical systems meet all safety standards.",
      image: "/Services Pictures/ElectricianMultimeter.jpg"
    }
  ]

  const residentialServices = [
    {
      title: "PANEL UPGRADES & CIRCUIT EXPANSIONS",
      description: "Modern electrical panel upgrades and circuit expansions to handle increased electrical demands and ensure safety in your home.",
      image: "/Services Pictures/ElectricPanel.jpg"
    },
    {
      title: "LIGHTING INSTALLATION (INDOOR & OUTDOOR)",
      description: "Professional lighting installation services for both interior and exterior applications, enhancing your home's functionality and curb appeal.",
      image: "/Services Pictures/OutdoorLights.jpg"
    },
    {
      title: "EV CHARGER INSTALLATIONS",
      description: "Professional electric vehicle charging station installation to support your sustainable transportation needs at home.",
      image: "/Services Pictures/EVCharging.jpg"
    },
    {
      title: "WHOLE-HOME REWIRING & REMODEL PROJECTS",
      description: "Complete home rewiring services and electrical work for remodeling projects, bringing your home up to modern electrical standards.",
      image: "/Services Pictures/HomeRemodel.jpg"
    },
    {
      title: "BACKUP GENERATOR SYSTEMS",
      description: "Automatic standby generator installation and transfer switch systems to keep your home powered during outages.",
      image: "/Services Pictures/TransferSwitch.jpg"
    },
    {
      title: "CODE COMPLIANCE & SAFETY INSPECTIONS",
      description: "Thorough electrical inspections and safety assessments to ensure your home's electrical system meets all current codes.",
      image: "/Services Pictures/MultiMeter.jpg"
    }
  ]

  return (
    <>
      {/* Commercial Services Section */}
      <section className="services commercial-section">
        {/* Orange accent bar */}
        <div className="services-accent">OUR SERVICES</div>

        <div className="services-layout">
          {/* Fixed left sidebar */}
          <div className="services-sidebar">
            <h2
              className="sidebar-title"
              style={{
                transform: `translateY(${commercialMovement}px)`
              }}
            >
              COMMERCIAL<br />
              ELECTRICAL<br />
              SERVICES
            </h2>
          </div>

          {/* Right side: Vertical scrolling panels */}
          <div className="services-panels">
            {commercialServices.map((service, index) => (
              <div key={index} className="service-panel" style={{ backgroundImage: `url("${service.image}")` }}>
                <div className="panel-overlay"></div>
                <div className="panel-content">
                  <h3 className="panel-title">{service.title}</h3>
                </div>
                <div className="panel-description">
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Residential Services Section */}
      <section className="services residential-section">
        {/* Orange accent bar */}
        <div className="services-accent">OUR SERVICES</div>

        <div className="services-layout">
          {/* Fixed left sidebar */}
          <div className="services-sidebar">
            <h2
              className="sidebar-title"
              style={{
                transform: `translateY(${residentialMovement}px)`
              }}
            >
              RESIDENTIAL<br />
              ELECTRICAL<br />
              SERVICES
            </h2>
          </div>

          {/* Right side: Vertical scrolling panels */}
          <div className="services-panels">
            {residentialServices.map((service, index) => (
              <div key={index} className="service-panel" style={{ backgroundImage: `url("${service.image}")` }}>
                <div className="panel-overlay"></div>
                <div className="panel-content">
                  <h3 className="panel-title">{service.title}</h3>
                </div>
                <div className="panel-description">
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <style>{`
        .services {
          background: #1a1a1a;
          color: var(--white);
          position: relative;
          overflow-x: hidden;
          width: 100%;
        }

        .commercial-section {
          min-height: calc(4 * 50vh);
        }

        .residential-section {
          min-height: calc(4 * 50vh);
        }

        .services-accent {
          background: #f0941d;
          color: var(--white);
          padding: var(--space-3) var(--space-6);
          font-weight: 700;
          font-size: var(--text-sm);
          letter-spacing: 2px;
          text-transform: uppercase;
          display: inline-block;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 10;
        }

        .commercial-section .services-accent {
          background: #cd0a1b;
        }

        .residential-section .services-accent {
          background: #f0941d;
        }

        .services-layout {
          display: grid;
          grid-template-columns: 450px 1fr;
          min-height: 100vh;
          max-width: 100vw;
          overflow-x: hidden;
        }

        .services-sidebar {
          background: #1a1a1a;
          padding: var(--space-16) var(--space-6) var(--space-8);
          border-right: 1px solid #333;
          position: relative;
          height: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          overflow: hidden;
          word-wrap: break-word;
        }

        .services::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 4px;
          height: 100%;
          background: #f0941d;
          z-index: 1;
        }

        .commercial-section::before {
          background: #cd0a1b;
        }

        .residential-section::before {
          background: #f0941d;
        }

        .sidebar-title {
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: var(--space-12);
          color: var(--white);
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.5s ease;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        .services-panels {
          background: #1a1a1a;
          display: flex;
          flex-direction: column;
        }

        .service-panel {
          height: 50vh;
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          border-bottom: 1px solid #333;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .service-panel:hover {
          display: block;
        }

        .panel-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.2) 0%,
            rgba(0, 0, 0, 0.4) 50%,
            rgba(0, 0, 0, 0.8) 100%
          );
          transition: all 0.3s ease;
        }

        .service-panel:hover .panel-overlay {
          background: rgba(0, 0, 0, 0.85);
        }

        .panel-content {
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 2;
          padding: var(--space-8);
          width: 100%;
          transition: all 0.3s ease;
        }

        .panel-title {
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 900;
          color: var(--white);
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: var(--space-4);
          transition: all 0.3s ease;
        }

        .service-panel:hover .panel-content {
          top: var(--space-6);
          left: var(--space-6);
          bottom: auto;
          width: auto;
          padding: 0;
          z-index: 6;
        }

        .service-panel:hover .panel-title {
          font-size: clamp(1.2rem, 2.5vw, 1.8rem);
          margin-bottom: 0;
        }

        .service-panel:hover .panel-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 100%;
          height: 3px;
          background: #f0941d;
        }

        .commercial-section .service-panel:hover .panel-title::after {
          background: #cd0a1b;
        }

        .panel-description {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          text-align: center;
          padding: var(--space-8);
          z-index: 3;
          pointer-events: none;
        }

        .service-panel:hover .panel-description {
          opacity: 1;
          visibility: visible;
          z-index: 5;
          pointer-events: auto;
        }

        .panel-description p {
          color: var(--white);
          line-height: 1.6;
          font-size: clamp(1rem, 2vw, 1.3rem);
          margin: 0;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
          font-weight: 500;
        }

        @media (max-width: 1024px) {
          .services-layout {
            grid-template-columns: 1fr;
          }

          .services-sidebar {
            position: relative;
            height: auto;
            min-height: 30vh;
          }

          .service-panel {
            height: 40vh;
          }

          .panel-description p {
            max-width: 100%;
          }
        }

        @media (max-width: 768px) {
          .services-accent {
            position: relative;
            width: 100%;
            margin-bottom: var(--space-4);
          }

          .services-sidebar {
            padding: var(--space-12) var(--space-4) var(--space-8);
            min-height: auto;
          }

          .sidebar-title {
            font-size: 2rem;
            transform: none !important;
            margin-bottom: var(--space-6);
          }

          .panel-title {
            font-size: clamp(1.2rem, 5vw, 2rem);
            letter-spacing: 1px;
          }

          .service-panel {
            height: 35vh;
          }

          .panel-content {
            padding: var(--space-4);
          }

          .service-panel:hover .panel-content {
            top: var(--space-3);
            left: var(--space-3);
            padding: 0;
          }

          .service-panel:hover .panel-title {
            font-size: 1rem;
            margin-bottom: var(--space-2);
          }

          .panel-description {
            padding: var(--space-16) var(--space-4) var(--space-4);
          }

          .panel-description p {
            font-size: 0.9rem;
            line-height: 1.4;
          }
        }
      `}</style>
    </>
  );
}

export default Services;