import CardComponent from "../components/CardComponent";
import HeroComponent from "../components/HeroComponent";
import { useState, useEffect } from "react";
import {
  getAllDestinations,
  filterDestinations,
  getDestinationById,
} from "../services/destinationService";

const HomePage = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const loadDestinations = async () => {
      const all = getAllDestinations();
      setDestinations(all);
    };
    loadDestinations();
  }, []);

  return (
    <>
      <HeroComponent />

      <section className="container my-5">
        <div className="row g-4 justify-content-center">
          {destinations.map((dest) => (
            <CardComponent key={dest.id} destination={dest} />
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;
