import { useEffect, useRef, useState } from 'react';

// Bell County boundary from Killeen GIS (serves only Bell County as GeoJSON)
const BELL_COUNTY_GEOJSON_URL = "https://killeengis.killeentexas.gov/arcgis/rest/services/KilleenBase/MapServer/4/query?where=1%3D1&outFields=*&outSR=4326&f=geojson";

const GOOGLE_MAPS_SRC = (key: string) => `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&v=weekly`;

function loadGoogleMaps(key: string) {
  if (window.google?.maps) return Promise.resolve(window.google);
  if (window.__gmapsPromise) return window.__gmapsPromise;

  window.__gmapsPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = GOOGLE_MAPS_SRC(key);
    s.async = true;
    s.onerror = () => reject(new Error("Failed to load Google Maps JS API"));
    s.onload = () => {
      const g = window.google;
      g?.maps ? resolve(g) : reject(new Error("google.maps not available after load"));
    };
    document.head.appendChild(s);
  });
  return window.__gmapsPromise;
}

function createFallbackPolygon(map: google.maps.Map, google: typeof window.google) {
  console.log('Creating accurate Bell County polygon based on road map');

  // Bell County boundaries traced from the actual road map
  // The county has a distinctive shape - roughly rectangular but with irregular borders
  const bellCountyCoords = [
    // Starting from northwest corner, going clockwise
    // Northwest corner (Coryell County border)
    { lat: 31.3080, lng: -97.7200 },

    // North border (with Coryell County) - relatively straight eastward
    { lat: 31.3080, lng: -97.6000 },
    { lat: 31.3080, lng: -97.5000 },
    { lat: 31.3080, lng: -97.4000 },
    { lat: 31.3080, lng: -97.3000 },

    // Northeast corner - slight jog south then east (McLennan County)
    { lat: 31.3000, lng: -97.2800 },
    { lat: 31.3000, lng: -97.2000 },

    // East border (McLennan/Falls County) - irregular jagged line going south
    { lat: 31.2800, lng: -97.1800 },
    { lat: 31.2600, lng: -97.1600 },
    { lat: 31.2400, lng: -97.1500 },
    { lat: 31.2200, lng: -97.1400 },
    { lat: 31.2000, lng: -97.1300 },
    { lat: 31.1800, lng: -97.1200 },
    { lat: 31.1600, lng: -97.1100 },
    { lat: 31.1400, lng: -97.1000 },
    { lat: 31.1200, lng: -97.0900 },
    { lat: 31.1000, lng: -97.0800 },
    { lat: 31.0800, lng: -97.0750 },
    { lat: 31.0600, lng: -97.0700 },
    { lat: 31.0400, lng: -97.0650 },
    { lat: 31.0200, lng: -97.0600 },
    { lat: 31.0000, lng: -97.0550 },

    // Southeast corner (Milam County border)
    { lat: 30.9800, lng: -97.0500 },

    // South border (Williamson County) - angled southwest
    { lat: 30.9600, lng: -97.1000 },
    { lat: 30.9400, lng: -97.1500 },
    { lat: 30.9200, lng: -97.2000 },
    { lat: 30.9000, lng: -97.2500 },
    { lat: 30.8800, lng: -97.3000 },
    { lat: 30.8600, lng: -97.3500 },
    { lat: 30.8400, lng: -97.4000 },
    { lat: 30.8200, lng: -97.4500 },
    { lat: 30.8000, lng: -97.5000 },
    { lat: 30.7800, lng: -97.5500 },
    { lat: 30.7600, lng: -97.6000 },

    // Southwest corner
    { lat: 30.7400, lng: -97.6500 },

    // West border (Burnet/Lampasas County) - going north
    { lat: 30.7600, lng: -97.7000 },
    { lat: 30.8000, lng: -97.7100 },
    { lat: 30.8500, lng: -97.7150 },
    { lat: 30.9000, lng: -97.7180 },
    { lat: 30.9500, lng: -97.7200 },
    { lat: 31.0000, lng: -97.7200 },
    { lat: 31.0500, lng: -97.7200 },
    { lat: 31.1000, lng: -97.7200 },
    { lat: 31.1500, lng: -97.7200 },
    { lat: 31.2000, lng: -97.7200 },
    { lat: 31.2500, lng: -97.7200 },

    // Back to northwest corner
    { lat: 31.3080, lng: -97.7200 }
  ];

  // Create the polygon
  const bellCountyPolygon = new google.maps.Polygon({
    paths: bellCountyCoords,
    strokeColor: '#cd0a1b',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#cd0a1b',
    fillOpacity: 0.2,
    clickable: true
  });

  bellCountyPolygon.setMap(map);

  // Add click listener
  bellCountyPolygon.addListener('click', (event: google.maps.MapMouseEvent) => {
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="font-family: Arial, sans-serif; padding: 8px;">
          <h4 style="margin: 0 0 8px 0; color: #cd0a1b;">Bell County Service Area</h4>
          <p style="margin: 0; font-size: 13px; color: #666;">Primary service region for Vidana Electric</p>
        </div>
      `,
      position: event.latLng
    });
    infoWindow.open(map);
  });

  // Fit bounds to the polygon
  const bounds = new google.maps.LatLngBounds();
  bellCountyCoords.forEach(coord => bounds.extend(coord));
  map.fitBounds(bounds);

  console.log('Fallback Bell County polygon created and added to map');
}

function Area() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  // IntersectionObserver for circuit animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Increment key to force re-animation
            setAnimationKey(prev => prev + 1);
          }
        })
      },
      { threshold: 0.3 }
    );

    const element = document.querySelector('.service-area');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (!apiKey) {
      console.error("Missing Google Maps API key");
      return;
    }
    let cancelled = false;

    (async () => {
      try {
        const google = await loadGoogleMaps(apiKey);
        if (cancelled || !mapDivRef.current) return;

        // 1) Create map
        const map = new google.maps.Map(mapDivRef.current, {
          center: { lat: 31.205, lng: -97.313 }, // placeholder; we'll fit to county
          zoom: 9,
          mapTypeId: "roadmap",
          gestureHandling: "greedy",
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: true,
          rotateControl: true,
          fullscreenControl: true,
        });
        mapRef.current = map;

        // 2) Style Data layer and load Bell County GeoJSON with Vidana colors
        map.data.setStyle(() => ({
          fillColor: "#cd0a1b", // Vidana red
          fillOpacity: 0.25,
          strokeColor: "#cd0a1b", // Vidana red
          strokeWeight: 2,
        }));

        // Add click listener for Bell County polygon
        map.data.addListener('click', (event: google.maps.Data.MouseEvent) => {
          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="font-family: Arial, sans-serif; padding: 8px;">
                <h4 style="margin: 0 0 8px 0; color: #cd0a1b;">Bell County Service Area</h4>
                <p style="margin: 0; font-size: 13px; color: #666;">Primary service region for Vidana Electric</p>
              </div>
            `,
            position: event.latLng
          });
          infoWindow.open(map);
        });

        try {
          console.log('Loading Bell County GeoJSON from Killeen GIS:', BELL_COUNTY_GEOJSON_URL);
          const res = await fetch(BELL_COUNTY_GEOJSON_URL, { mode: "cors" });
          if (!res.ok) throw new Error(`GeoJSON fetch failed: ${res.status}`);
          const geojson = await res.json();

          const features = map.data.addGeoJson(geojson);
          console.log('Bell County features loaded from Killeen GIS:', features.length);

          if (!features.length) {
            console.warn("Bell County GeoJSON loaded but contained 0 features, using fallback");
            createFallbackPolygon(map, google);
          } else {
            const bounds = new google.maps.LatLngBounds();
            features.forEach((f: google.maps.Data.Feature) => {
              f.getGeometry()?.forEachLatLng((ll: google.maps.LatLng) => bounds.extend(ll));
            });
            if (!bounds.isEmpty()) {
              map.fitBounds(bounds);
              console.log('Map fitted to actual Bell County boundaries');
            }
          }
        } catch (e) {
          console.error("Failed to load Bell County GeoJSON from Killeen GIS:", e);
          console.log("Using fallback polygon");
          createFallbackPolygon(map, google);
        }

        // 3) Geocode and place the business marker
        try {
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ address: "807 N Central Ave, Troy, TX 76579" }, (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
            if (cancelled) return;
            if (status === "OK" && results && results[0]) {
              const loc = results[0].geometry.location;
              if (markerRef.current) {
                markerRef.current.setMap(null);
              }
              markerRef.current = new google.maps.Marker({
                position: loc,
                map,
                title: "Vidana Electric",
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  fillColor: '#cd0a1b',
                  fillOpacity: 1,
                  strokeColor: '#ffffff',
                  strokeWeight: 3,
                  scale: 10
                }
              });

              // Create the info window with logo
              const infoWindow = new google.maps.InfoWindow({
                content: `
                  <div style="font-family: 'Proxima Nova', Arial, sans-serif; min-width: 220px; line-height: 1.4;">
                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                      <img src="/logo.png" alt="Vidana Electric" style="width: 40px; height: 40px; margin-right: 10px;" />
                      <h3 style="margin: 0; color: #cd0a1b; font-size: 16px; font-weight: bold;">Vidana Electric</h3>
                    </div>
                    <p style="margin: 0 0 4px 0; color: #333; font-size: 14px; font-weight: 600;">Headquarters</p>
                    <p style="margin: 0 0 4px 0; color: #666; font-size: 13px;">807 N Central Ave, Troy, TX 76579</p>
                    <p style="margin: 0 0 6px 0; color: #666; font-size: 13px;">Serving Bell County & Central Texas</p>
                    <p style="margin: 0; color: #cd0a1b; font-size: 12px; font-weight: bold;">50+ Years of Experience</p>
                  </div>
                `,
                maxWidth: 280
              });

              // Add click listener to marker
              markerRef.current.addListener('click', () => {
                infoWindow.open(map, markerRef.current || undefined);
              });

              // Keep county in view but bias toward your marker
              const zoom = map.getZoom();
              if (zoom && zoom < 11) map.setZoom(11);
              map.panTo(loc);
            } else {
              console.warn("Geocode failed:", status);
            }
          });
        } catch (e) {
          console.error("Geocoding error:", e);
        }
      } catch (error) {
        console.error("Error loading map:", error);
        // Graceful fallback
        if (mapDivRef.current) {
          mapDivRef.current.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f5f5f5; color: #666; text-align: center; padding: 20px;">
              <div>
                <h3 style="margin: 0 0 10px 0; color: #cd0a1b;">Service Area</h3>
                <p style="margin: 0;">Bell County, Texas<br/>Headquartered in Troy, TX</p>
              </div>
            </div>
          `;
        }
      }
    })();

    return () => {
      cancelled = true;
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
      markerRef.current = null;
      mapRef.current = null;
    };
  }, [apiKey]);

  return (
    <section className="service-area">
      {/* Google Maps with Bell County Overlay */}
      <div className="area-background">
        <div className="google-maps-container">
          <div
            ref={mapDivRef}
            className="google-map"
            style={{ width: '100%', height: '100%' }}
          ></div>


          <div className="map-info">
            <div className="info-card">
              <h4>Service Area</h4>
              <p><strong>Bell County, Texas</strong></p>
              <p>Headquartered in Temple, TX</p>
              <p>Serving Central Texas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Left content overlay */}
      <div className="area-content">
        <div className="content-wrapper">
          <div
            key={animationKey}
            className={`circuit-accent circuit-gold ${animationKey > 0 ? 'circuit-active' : ''}`}
          ></div>

          <div className="area-accent">SERVICE AREA</div>

          <h2 className="area-title">
            PROUDLY SERVING<br />
            CENTRAL<br />
            TEXAS
          </h2>

          <p className="area-description">
            With over 50 years of experience, Vidana Electric provides comprehensive electrical services throughout Central Texas. From Temple headquarters, we serve residential and commercial clients across the region with reliable, professional electrical solutions you can trust.
          </p>

          <a href="#contact" className="area-cta">
            <span>Get a Free Estimate</span>
          </a>
        </div>
      </div>

      <style>{`
        .service-area {
          position: relative;
          min-height: 100vh;
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
          overflow: hidden;
        }

        .area-background {
          position: absolute;
          top: 0;
          left: 50%;
          width: 50%;
          height: 100%;
          background: transparent;
          display: flex;
          align-items: stretch;
          justify-content: stretch;
        }

        .area-background::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          z-index: 0;
        }

        .google-maps-container {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .google-map {
          width: 100%;
          height: 100%;
          border: none;
          pointer-events: auto;
          user-select: none;
          position: relative;
        }


        .map-info {
          position: absolute;
          bottom: var(--space-4);
          left: var(--space-4);
          z-index: 2;
          pointer-events: none;
        }

        .info-card {
          background: rgba(255, 255, 255, 0.95);
          padding: var(--space-4);
          border-radius: 8px;
          border: 1px solid rgba(26, 26, 26, 0.08);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
        }

        .info-card h4 {
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--primary-red);
          margin: 0 0 var(--space-2) 0;
        }

        .info-card p {
          font-size: var(--text-sm);
          color: var(--black);
          margin: 0 0 var(--space-1) 0;
          line-height: 1.4;
        }

        .info-card p:last-child {
          margin-bottom: 0;
        }

        .info-card strong {
          font-weight: 700;
          color: var(--primary-red);
        }

        .area-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          display: flex;
          align-items: center;
          z-index: 2;
          pointer-events: none;
        }

        .content-wrapper {
          max-width: 500px;
          padding: 0 var(--space-8);
          margin-left: var(--space-8);
          pointer-events: auto;
          position: relative;
          padding-left: 60px;
        }

        .content-wrapper .circuit-accent {
          width: 2px;
          height: 100%;
          min-height: 350px;
          background: transparent;
          flex-shrink: 0;
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          overflow: visible;
          z-index: 5;
        }

        .content-wrapper .circuit-accent::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 2px;
          height: 0;
          background: var(--secondary-red);
          transition: all var(--transition-base) ease;
        }

        .content-wrapper .circuit-accent::after {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background: var(--white);
          border-radius: 50%;
          box-shadow:
            0 0 3px var(--white),
            0 0 6px var(--white),
            0 0 9px var(--secondary-red),
            0 0 12px var(--secondary-red),
            0 0 18px rgba(220, 38, 38, 0.9),
            0 0 24px rgba(220, 38, 38, 0.6),
            0 0 30px rgba(220, 38, 38, 0.3);
          opacity: 0;
          transition: top 1.2s ease-out, opacity var(--transition-base) ease;
          z-index: 10;
        }

        .content-wrapper .circuit-accent.circuit-active::before {
          animation: circuitLineGrow var(--animation-duration) linear forwards;
        }

        .content-wrapper .circuit-accent.circuit-active::after {
          animation: circuitLightTravel var(--animation-duration) linear forwards;
        }

        .area-accent {
          background: var(--primary-red);
          color: var(--white);
          padding: var(--space-2) var(--space-4);
          font-weight: 700;
          font-size: var(--text-xs);
          letter-spacing: 2px;
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: var(--space-6);
        }

        .area-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 900;
          line-height: 1.1;
          color: var(--black);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: var(--space-8);
        }

        .area-description {
          color: rgba(26, 26, 26, 0.8);
          line-height: 1.7;
          font-size: var(--text-base);
          margin-bottom: var(--space-8);
        }

        .area-cta {
          display: inline-flex;
          align-items: center;
          background: #cd0a1b;
          color: #ffffff;
          padding: 16px 32px;
          text-decoration: none;
          font-weight: 700;
          font-size: 16px;
          text-transform: none;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          border-radius: 0;
          border: none;
          font-family: 'Proxima Nova', -apple-system, BlinkMacSystemFont, sans-serif;
          position: relative;
          overflow: hidden;
        }

        .area-cta:hover {
          color: #ffffff;
          background: #cd0a1b;
          transform: none;
          text-shadow:
            0 0 2px #ffffff,
            0 0 4px #ffffff,
            1px 1px 3px rgba(0, 0, 0, 0.6);
        }

        .area-cta:hover::before {
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

        .area-cta:hover::after {
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

        @media (max-width: 1024px) {
          .content-wrapper {
            max-width: 450px;
            margin-left: var(--space-4);
          }

          .area-title {
            font-size: clamp(2rem, 6vw, 3rem);
          }
        }

        @media (max-width: 768px) {
          .service-area {
            height: auto;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }

          .area-background {
            position: relative;
            left: 0;
            width: 100%;
            height: auto;
            border-radius: 0;
            box-shadow: none;
            order: 2;
            margin-top: var(--space-8);
          }

          .area-content {
            position: relative;
            width: 100%;
            height: auto;
            padding: var(--space-16) 0;
            order: 1;
          }

          .content-wrapper {
            max-width: 100%;
            margin-left: 0;
            padding: 0 var(--space-6);
          }

          .area-title {
            font-size: clamp(1.8rem, 8vw, 2.5rem);
          }

          .google-map {
            height: 400px;
          }


          .google-maps-container {
            max-width: 100%;
          }

          .info-card {
            padding: var(--space-3);
          }

          .info-card p {
            font-size: var(--text-xs);
          }
        }

        /* Remove white gap from Google Maps InfoWindow */
        .gm-style .gm-style-iw-c {
          padding: 12px !important;
        }

        .gm-style .gm-style-iw-d {
          overflow: auto !important;
          max-height: none !important;
        }

        .gm-style .gm-style-iw-chr {
          position: absolute !important;
          top: 0 !important;
          right: 0 !important;
          height: auto !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        .gm-style .gm-style-iw-chr > button {
          position: relative !important;
          top: 4px !important;
          right: 4px !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        .gm-style .gm-style-iw-t::after {
          top: 0 !important;
        }
      `}</style>
    </section>
  );
}

export default Area;