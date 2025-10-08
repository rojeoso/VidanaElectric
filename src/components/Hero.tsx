import { useEffect, useState } from 'react'

function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      // Trigger hero text animation when page loads
      if (window.scrollY >= 0) {
        setIsVisible(true)
      }
    }

    // Trigger animation on mount
    setIsVisible(true)

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate animation progress for mission section
  const missionProgress = Math.min(Math.max((scrollY - 300) / 400, 0), 1)

  return (
    <>
      {/* Full-screen hero matching Hero1 */}
      <section className="hero">
        <div className="hero-background">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/Hero Videos/HeroProject.mp4" type="video/mp4" />
            <div className="hero-image"></div>
          </video>
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <h1 className={`hero-title ${isVisible ? 'animate-in' : ''}`}>
            <span className="header-word word-1">Vidana</span>
            {' '}
            <span className="header-word word-2">
              <span className="topo-text">Electric</span>
            </span>
          </h1>
          <p className={`hero-subtitle ${isVisible ? 'animate-in' : ''}`} style={{ animationDelay: '1.2s' }}>
            We bring the <span className="electric-power">power</span> to you
          </p>
        </div>
      </section>

      {/* Mission section that appears on scroll - matching Hero2 */}
      <section className="mission">
        <div className="container">
          <div className="mission-content">
            <div
              className={`circuit-accent circuit-red ${missionProgress > 0.1 ? 'circuit-active' : ''}`}
            ></div>

            <div className="mission-text">
              <p
                className="mission-statement"
                style={{
                  transform: `translateY(${Math.max(0, 30 - missionProgress * 30)}px)`,
                  opacity: missionProgress
                }}
              >
                <span className="text-white">WE SET THE</span> <span className="text-primary">STANDARD FOR ELECTRICAL EXCELLENCE</span><span className="text-white">—EARNING TRUST THROUGH MASTER-LEVEL WORKMANSHIP, DECADES OF EXPERTISE, AND A CULTURE THAT PUTS</span> <span className="text-primary">PEOPLE AND SAFETY FIRST.</span>
              </p>

              <div
                className="mission-cta-container"
                style={{
                  transform: `translateY(${Math.max(0, 40 - missionProgress * 40)}px)`,
                  opacity: missionProgress
                }}
              >
                <a href="#contact" className="cta-button">
                  <span>Bring me the Power</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .hero {
          position: relative;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .hero-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 0;
        }

        .hero-video::-webkit-media-controls {
          display: none !important;
        }

        .hero-video::-webkit-media-controls-panel {
          display: none !important;
        }

        .hero-image {
          width: 100%;
          height: 100%;
          background: linear-gradient(rgba(15, 35, 65, 0.7), rgba(15, 35, 65, 0.8)),
                      url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><radialGradient id="grad1" cx="50%" cy="50%" r="50%"><stop offset="0%" style="stop-color:%23ffa500;stop-opacity:0.3" /><stop offset="100%" style="stop-color:%23000;stop-opacity:0.8" /></radialGradient></defs><rect fill="url(%23grad1)" width="1200" height="800"/><g fill="%23444" opacity="0.6"><circle cx="300" cy="200" r="40"/><circle cx="900" cy="600" r="35"/><rect x="400" y="300" width="400" height="200" rx="20"/><ellipse cx="600" cy="400" rx="80" ry="40" fill="%23ffa500" opacity="0.4"/></g></svg>');
          background-size: cover;
          background-position: center;
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg,
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0.4) 30%,
            rgba(0, 0, 0, 0.6) 70%,
            rgba(0, 0, 0, 0.8) 100%
          );
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 1200px;
          padding: 0 var(--space-6);
        }

        .hero-title {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 700;
          color: var(--white);
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.6);
          line-height: 1.1;
          margin: 0 0 var(--space-4) 0;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-family: 'Proxima Nova', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .hero-title .header-word {
          display: inline-block;
          opacity: 0;
          transform: translateY(30px);
          animation: wordReveal 0.8s ease-out forwards;
          animation-play-state: paused;
        }

        .hero-title.animate-in .word-1 {
          animation-delay: 0.2s;
          animation-play-state: running;
        }

        .hero-title.animate-in .word-2 {
          animation-delay: 0.6s;
          animation-play-state: running;
        }

        .hero-subtitle.animate-in {
          animation-play-state: running;
        }

        @keyframes wordReveal {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-subtitle {
          font-size: clamp(1.2rem, 3vw, 1.8rem);
          font-weight: 400;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
          line-height: 1.4;
          margin: 0;
          letter-spacing: 1px;
          font-family: 'Proxima Nova', -apple-system, BlinkMacSystemFont, sans-serif;
          text-align: center;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s ease-out forwards;
          animation-play-state: paused;
        }

        .mission {
          transition: all 0.3s ease-out;
        }

        .mission-statement,
        .mission-cta-container,
        .mission .circuit-accent {
          transition: all 0.6s ease-out;
        }

        .electric-power {
          position: relative;
          color: var(--primary-red);
          font-weight: 700;
          text-shadow:
            0 0 3px var(--primary-red),
            0 0 6px var(--primary-red),
            1px 1px 4px rgba(0, 0, 0, 0.6);
          animation: electricGlow 3s ease-in-out infinite alternate;
        }

        .electric-power::before {
          content: '';
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          bottom: -1px;
          background: linear-gradient(45deg, transparent 45%, var(--primary-red) 50%, transparent 55%);
          background-size: 300% 300%;
          border-radius: 2px;
          z-index: -1;
          animation: electricSpark 4s linear infinite;
          opacity: 0.15;
        }

        .electric-power::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            #cd0a1b 30%,
            rgba(255, 255, 255, 0.6) 50%,
            #cd0a1b 70%,
            transparent 100%
          );
          background-size: 300% 100%;
          animation: electricFlow 2s linear infinite;
          box-shadow: 0 0 2px rgba(205, 10, 27, 0.4);
          opacity: 0.7;
        }

        @keyframes electricGlow {
          0% {
            text-shadow:
              0 0 3px #cd0a1b,
              0 0 6px #cd0a1b,
              1px 1px 4px rgba(0, 0, 0, 0.6);
          }
          100% {
            text-shadow:
              0 0 5px #cd0a1b,
              0 0 10px #cd0a1b,
              0 0 15px rgba(205, 10, 27, 0.5),
              1px 1px 4px rgba(0, 0, 0, 0.6);
          }
        }

        @keyframes electricSpark {
          0% {
            background-position: -200% -200%;
          }
          100% {
            background-position: 200% 200%;
          }
        }

        @keyframes electricFlow {
          0% {
            background-position: -200% 0;
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
          100% {
            background-position: 200% 0;
            opacity: 0.8;
          }
        }

        .header-word {
          display: inline-block;
        }

        .topo-text {
          color: #cd0a1b;
          text-shadow: 3px 3px 10px rgba(205, 10, 27, 0.3);
          position: relative;
        }

        .topo-text::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 4px;
          background: linear-gradient(90deg, transparent 0%, #cd0a1b 20%, #cd0a1b 80%, transparent 100%);
          border-radius: 2px;
        }

        .mission {
          position: relative;
          padding: var(--space-24) 0;
          background: #000;
          color: var(--white);
          overflow: hidden;
        }

        .mission-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: flex-start;
          gap: var(--space-8);
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--space-6);
          padding-left: var(--space-12);
        }

        /* Mission section specific circuit positioning */
        .mission .circuit-accent {
          left: var(--space-6);
          min-height: 200px;
        }

        .mission-text {
          flex: 1;
        }

        .mission-statement {
          font-size: clamp(1.125rem, 2.5vw, 1.5rem);
          line-height: 1.5;
          margin-bottom: var(--space-12);
          font-weight: 600;
          letter-spacing: 0.5px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          text-align: center;
          font-family: 'Proxima Nova', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .text-primary {
          color: #cd0a1b;
        }

        .text-white {
          color: #ffffff;
        }


        .mission-cta-container {
          display: flex;
          justify-content: center;
          margin-top: var(--space-6);
        }

        .mission-cta-container .cta-button {
          animation: slideUpFade 0.8s ease-out 0.5s both;
        }




        @keyframes slideUpFade {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: clamp(2rem, 10vw, 3rem);
            letter-spacing: 1px;
            margin-bottom: var(--space-3);
          }

          .hero-subtitle {
            font-size: clamp(1rem, 4vw, 1.4rem);
          }

          .mission {
            padding: var(--space-16) 0;
          }

          .mission-content {
            flex-direction: column;
            gap: var(--space-6);
          }

          .mission .circuit-accent {
            width: 100%;
            height: 6px;
            margin-top: 0;
          }

          .mission-statement {
            font-size: clamp(1rem, 3.5vw, 1.25rem);
          }

          .mission-cta-container .cta-button {
            font-size: var(--text-sm);
            padding: var(--space-3) var(--space-4);
          }

          .topo-text::after {
            bottom: -6px;
            height: 3px;
          }
        }
      `}</style>
    </>
  )
}

export default Hero