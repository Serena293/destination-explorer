import React from "react";
import Globe from "react-globe.gl";

const BespokeTrip = () => {
  // Esempio di punti sul globo
  const points = [
    { lat: 51.5074, lng: -0.1278, name: "London" },
    { lat: 48.8566, lng: 2.3522, name: "Paris" },
    { lat: 40.7128, lng: -74.006, name: "New York" },
  ];

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        pointColor={() => "orange"}
        pointAltitude={0.02}
        pointRadius={0.3}
        autoRotate={true}
        autoRotateSpeed={0.3}
        enablePointerInteraction={true}
        pointLabel={(d) => d.name} 
      />
    </div>
  );
};

export default BespokeTrip;
