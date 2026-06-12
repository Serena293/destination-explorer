import { useState } from "react";
import { Link } from "react-router-dom";
import CardComponent from "../components/CardComponent";
import ModalComponent from "../components/ModalComponent";
import { getAllDestinations } from "../services/destinationService";
import { useShortlist } from "../context/ShortlistContext";

const ShortlistPage = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);

  const {
    savedDestinationIds,
    toggleSavedDestination,
    isDestinationSaved,
  } = useShortlist();

  const destinations = getAllDestinations();

  const savedDestinations = destinations.filter((destination) =>
    savedDestinationIds.includes(destination.id),
  );

  return (
    <main
      className="container py-4 py-md-5"
      aria-labelledby="shortlist-title"
    >
      <header className="shortlist-heading mb-4">
        <h1 id="shortlist-title">Your shortlist</h1>
        <p>
          Review the destinations you saved while planning your next trip.
        </p>
      </header>

      {savedDestinations.length === 0 ? (
        <section className="shortlist-empty-state text-center">
          <i className="bi bi-bookmark" aria-hidden="true" />
          <h2 className="h4 mt-3">Your shortlist is empty</h2>
          <p className="text-body-secondary">
            Explore the catalogue and save the destinations that catch your
            eye.
          </p>
          <Link className="btn btn-primary" to="/ourdestinations">
            Explore destinations
          </Link>
        </section>
      ) : (
        <>
          <p className="shortlist-count" aria-live="polite">
            {savedDestinations.length}{" "}
            {savedDestinations.length === 1
              ? "destination saved"
              : "destinations saved"}
          </p>

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
                  onSelect={setSelectedDestination}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {selectedDestination && (
        <ModalComponent
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
          isSaved={isDestinationSaved(selectedDestination.id)}
          onToggleSave={() => {
            toggleSavedDestination(selectedDestination.id);
            setSelectedDestination(null);
          }}
        />
      )}
    </main>
  );
};

export default ShortlistPage;
