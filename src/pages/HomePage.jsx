import { useState } from "react";
import BespokeTrip from "../components/BespokeTrip";
import HeroComponent from "../components/HeroComponent";
import OurDestinations from "../components/OurDestinations";
const HomePage = () => {
  const [activeTab, setActiveTab] = useState("ourDestinationsn");
  return (
    <>
      <HeroComponent />
      <div className="d-flex justify-content-center gap-5 bg-white py-3">
        <button
          className="btn btn-link text-dark fw-bold border-bottom border-2"
          onClick={() => setActiveTab("ourDestinations")}
        >
          Our Destination
        </button>{" "}
        <button className="btn btn-link text-dark fw-bold border-bottom border-2" onClick={() => setActiveTab("bespokeTrip")}>
          Bespoke trip
        </button>
      </div>
      {activeTab === "ourDestinations" && <OurDestinations />}
      {activeTab === "bespokeTrip" && <BespokeTrip />}
    </>
  );
};

export default HomePage;
