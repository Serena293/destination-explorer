import Globe from "react-globe.gl";
import ContactForm from "./ContactForm";
import "./BespokeTrip.css";
import TripPreferencesForm from "./TripPreferencesForm";
import { useState } from "react";

const BespokeTrip = () => {
  const [departure, setDeparture] = useState(null);
  const [destination, setDestination] = useState(null);
  const [flexibleDestination, setFlexibleDestination] = useState(false);

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

  return (
    <section className="d-flex flex-column">
      <div className="globe-container">
        <Globe
          globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-day.jpg"
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
          // pointLabel={(d) => d.name}
          backgroundColor="#547792"
          width={typeof window !== "undefined" ? window.innerWidth : 800}
          height={
            typeof window !== "undefined" ? window.innerHeight * 0.3 : 320
          }
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
        />
      </div>
      {/* <div className="d-flex flex-column text-center">
        <h1>Plan your personalized trip</h1>
        <p>Have an idea but not quite sure how to make it work?</p>
        <p>
          Contact us with the details and we will help you shape the next step.
        </p> */}
      {/* </div> */}
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
