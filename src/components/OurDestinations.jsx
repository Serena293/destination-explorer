import CardComponent from "./CardComponent";

import { useState, useEffect } from "react";
import {
  getAllDestinations,
  filterDestinations,
  getDestinationById,
} from "../services/destinationService";
import ModalComponent from "./ModalComponent";

const OurDestination = () => {
  const [destinations, setDestinations] = useState([]);
  const [filtredDestinations, setFiltredDestinations] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const selectCard = (destination) => {
    setSelectedCard(destination);
  };
  const closeModal = () => {
    setSelectedCard(null);
  };

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const all =  getAllDestinations();
        setDestinations(all);
      } catch (error) {
        console.error("Error loading destination", error);
      }
    };
    loadDestinations();
  }, []);
  return (
    <section className="container my-5">
      <div className="row g-4 justify-content-center">
        {destinations.map((dest) => (
          <CardComponent
            key={dest.id}
            destination={dest}
            onSelect = {selectCard}
          />
        ))}
      </div>
       {selectedCard && (
        <ModalComponent
          destination={selectedCard}
          onClose={closeModal}
        />
      )}
    </section>
  );
};
export default OurDestination;
