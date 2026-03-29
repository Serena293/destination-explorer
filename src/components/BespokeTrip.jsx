import React from "react";
import Globe from "react-globe.gl";
import ContactForm from "./ContactForm";
import "./BespokeTrip.css"

const BespokeTrip = () => {
 
  const points = [
    { lat: 51.5074, lng: -0.1278, name: "London" },
    { lat: 48.8566, lng: 2.3522, name: "Paris" },
    { lat: 40.7128, lng: -74.006, name: "New York" },
  ];

  return (
     <section className="d-flex flex-column">
      <div className="globe-containre">
      <Globe
        globeImageUrl='//cdn.jsdelivr.net/npm/three-globe/example/img/earth-day.jpg'
        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        pointColor={() => "red"}
        pointAltitude={0.02}
        pointRadius={0.3}
        autoRotate={true}
        autoRotateSpeed={0.3}
        enablePointerInteraction={true}
        pointLabel={(d) => d.name} 
        backgroundColor="#547792"
         width={window.innerWidth}
  height={window.innerHeight * 0.3}
      
      />
      </div>
      <div className="d-flex flex-column text-center">
        <h1>Plan you Personalized trip</h1>
        <p> Have an idea but not quite sure how to make it work?</p>
        <p> Contact us with more the details and we will help you sort everything out</p>
      </div>
      <ContactForm/>
      
    </section>
  );
};

export default BespokeTrip;
