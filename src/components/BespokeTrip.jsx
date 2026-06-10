import Globe from "react-globe.gl";
import ContactForm from "./ContactForm";
import "./BespokeTrip.css";
import TripPreferencesForm from "./TripPreferencesForm";

const BespokeTrip = () => {
  const points = [
    { lat: 51.5074, lng: -0.1278, name: "London" },
    { lat: 48.8566, lng: 2.3522, name: "Paris" },
    { lat: 40.7128, lng: -74.006, name: "New York" },
  ];

  return (
    <section className="d-flex flex-column">
      <div className="globe-container">
        <Globe
          globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-day.jpg"
          pointsData={points}
          pointLat="lat"
          pointLng="lng"
          pointColor={() => "#FAB95B"}
          pointAltitude={0.02}
          pointRadius={0.3}
          autoRotate={true}
          autoRotateSpeed={0.3}
          enablePointerInteraction={true}
          pointLabel={(d) => d.name}
          backgroundColor="#547792"
          width={typeof window !== "undefined" ? window.innerWidth : 800}
          height={typeof window !== "undefined" ? window.innerHeight * 0.3 : 320}
        />
      </div>
      {/* <div className="d-flex flex-column text-center">
        <h1>Plan your personalized trip</h1>
        <p>Have an idea but not quite sure how to make it work?</p>
        <p>
          Contact us with the details and we will help you shape the next step.
        </p> */}
      {/* </div> */}
      {/* <ContactForm /> */}
      <TripPreferencesForm/>
    </section>
  );
};

export default BespokeTrip;
