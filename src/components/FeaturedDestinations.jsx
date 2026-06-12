import { useState } from "react";
import { Link } from "react-router-dom";
import CardComponent from "./CardComponent";
import ModalComponent from "./ModalComponent";
import { useShortlist } from "../context/ShortlistContext";
import { getDestinationById } from "../services/destinationService";

const FEATURED_DESTINATION_IDS = ["ROM", "NZ", "PUN"];

const FeaturedDestinations = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const { toggleSavedDestination, isDestinationSaved } = useShortlist();

  const featuredDestinations = FEATURED_DESTINATION_IDS.map(
    getDestinationById,
  ).filter(Boolean);

  return (
    <section
      className="home-featured container py-5"
      aria-labelledby="featured-destinations-title"
    >
      <header className="home-section-heading">
        <div>
          <h2 id="featured-destinations-title">Ideas for your next trip</h2>
          <p className="text-body-secondary mb-0">
            Start with a few destinations chosen for culture, nature, and
            relaxation.
          </p>
        </div>

        <Link className="home-section-link" to="/ourdestinations">
          View all destinations
          <i className="bi bi-arrow-right" aria-hidden="true" />
        </Link>
      </header>

      <div className="row g-4 mt-1">
        {featuredDestinations.map((destination) => (
          <div
            className="col-12 col-md-6 col-lg-4"
            key={destination.id}
          >
            <CardComponent
              destination={destination}
              onSelect={setSelectedDestination}
              isSaved={isDestinationSaved(destination.id)}
              onToggleSave={() =>
                toggleSavedDestination(destination.id)
              }
            />
          </div>
        ))}
      </div>

      {selectedDestination && (
        <ModalComponent
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
          isSaved={isDestinationSaved(selectedDestination.id)}
          onToggleSave={() =>
            toggleSavedDestination(selectedDestination.id)
          }
        />
      )}
    </section>
  );
};

export default FeaturedDestinations;
