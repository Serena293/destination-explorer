import CardComponent from "../components/CardComponent";
import { getAllDestinations } from "../services/destinationService";
import { useShortlist } from "../context/ShortlistContext";
import { useState } from "react";
import ModalComponent from "../components/ModalComponent";

const ShortlistPage = () => {
  const {
    savedDestinationIds,
    toggleSavedDestination,
    isDestinationSaved,
  } = useShortlist();

  const destinations = getAllDestinations();

  const savedDestinations = destinations.filter((destination) =>
    savedDestinationIds.includes(destination.id),
  );

  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <main className="container py-5">
      <header className="mb-4">
        <h1>Your shortlist</h1>
        <p>
          Review the destinations you saved while planning your next trip.
        </p>
      </header>

      {savedDestinations.length === 0 ? (
        <p>You have not saved any destinations yet.</p>
      ) : (
        <div className="row g-4">
          {savedDestinations.map((destination) => (
            <div
              className="col-12 col-md-6 col-lg-4"
              key={destination.id}
            >
              <CardComponent
                destination={destination}
                isSaved={isDestinationSaved(destination.id)}
                onToggleSave={() =>
                  toggleSavedDestination(destination.id)
                }
                onSelect={setSelectedCard}
              />
            </div>
          ))}
        </div>
        
      )}
      {selectedCard && (
  <ModalComponent
    destination={selectedCard}
    onClose={() => setSelectedCard(null)}
    isSaved={isDestinationSaved(selectedCard.id)}
    onToggleSave={() =>
      toggleSavedDestination(selectedCard.id)}
  />
)}
    </main>
  );
};

export default ShortlistPage;
