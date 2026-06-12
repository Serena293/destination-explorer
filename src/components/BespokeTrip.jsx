import Globe from "react-globe.gl";
import "./BespokeTrip.css";
import TripPreferencesForm from "./TripPreferencesForm";
import { useState, useRef, useEffect } from "react";

const BespokeTrip = () => {
  const [departure, setDeparture] = useState(null);
  const [destination, setDestination] = useState(null);
  const [flexibleDestination, setFlexibleDestination] = useState(false);

  const globeRef = useRef(null);
  const globeContainerRef = useRef(null);
  const [globeSize, setGlobeSize] = useState({
    width: 1200,
    height: 560,
  });

  const points = [
    departure && {
      ...departure,
      role: "departure",
      label: `Departure: ${departure.name}, ${departure.country}`,
    },
    destination &&
      !flexibleDestination && {
        ...destination,
        role: "destination",
        label: `Destination: ${destination.name}, ${destination.country}`,
      },
  ].filter(Boolean);

  const arcs =
    departure && destination && !flexibleDestination
      ? [
          {
            startLat: departure.latitude,
            startLng: departure.longitude,
            endLat: destination.latitude,
            endLng: destination.longitude,
          },
        ]
      : [];

  useEffect(() => {
    const selectedCity = destination || departure;

    if (!selectedCity || !globeRef.current) return;

    globeRef.current.pointOfView(
      {
        lat: selectedCity.latitude,
        lng: selectedCity.longitude,
        altitude: 1.8,
      },
      1000,
    );
  }, [departure, destination]);

  useEffect(() => {
    const container = globeContainerRef.current;

    if (!container) return undefined;

    const updateGlobeSize = () => {
      const width = container.clientWidth;
      const height = width < 768 ? 430 : 560;

      setGlobeSize({ width, height });
    };

    updateGlobeSize();

    const resizeObserver = new ResizeObserver(updateGlobeSize);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <section className="d-flex flex-column">
      <div className="globe-scene" ref={globeContainerRef}>
        <div className="globe-scene-content">
          <p className="globe-eyebrow">Bespoke trip planner</p>
          <h1>See your journey take shape</h1>
          <p>
            Choose where your trip begins and where you would like to go. Your
            route will appear on the globe as you build your brief.
          </p>

          <div className="globe-legend" aria-label="Map legend">
            <span>
              <i className="globe-legend-dot globe-legend-departure" />
              Departure
            </span>
            <span>
              <i className="globe-legend-dot globe-legend-destination" />
              Destination
            </span>
          </div>
        </div>

        <div className="globe-container" aria-hidden="true">
        <Globe
          globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
          pointsData={points}
          pointLat="latitude"
          pointLng="longitude"
          pointLabel="label"
          pointColor={(point) =>
            point.role === "departure" ? "#fab95b" : "#e63946"
          }
          pointAltitude={0.03}
          pointRadius={0.5}
          autoRotate={true}
          autoRotateSpeed={0.3}
          enablePointerInteraction={true}
          showAtmosphere={true}
          atmosphereColor="#79c7d3"
          atmosphereAltitude={0.18}
          backgroundColor="#07111f"
          width={globeSize.width}
          height={globeSize.height}
          arcsData={arcs}
          arcStartLat="startLat"
          arcStartLng="startLng"
          arcEndLat="endLat"
          arcEndLng="endLng"
          arcColor={() => "#fab95b"}
          arcStroke={0.5}
          arcDashLength={1}
          arcDashGap={0}
          arcDashAnimateTime={0}
          arcAltitudeAutoScale={0.6}
          ref={globeRef}
        />
        </div>

        <p className="visually-hidden" aria-live="polite">
          {departure
            ? `Departure selected: ${departure.name}, ${departure.country}.`
            : "No departure selected."}{" "}
          {flexibleDestination
            ? "Destination is flexible."
            : destination
              ? `Destination selected: ${destination.name}, ${destination.country}.`
              : "No destination selected."}
        </p>
      </div>

      <TripPreferencesForm
        departure={departure}
        setDeparture={setDeparture}
        destination={destination}
        setDestination={setDestination}
        flexibleDestination={flexibleDestination}
        setFlexibleDestination={setFlexibleDestination}
      />
    </section>
  );
};

export default BespokeTrip;
