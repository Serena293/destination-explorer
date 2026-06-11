import { useState, useEffect } from "react";
import CardComponent from "./CardComponent";
import ModalComponent from "./ModalComponent";
import SearchFilter from "./SearchFilter";
import { useShortlist } from "../context/shortlistContext";
import {
  getAllDestinations,
  filterDestinations,
} from "../services/destinationService";

import { Link } from "react-router-dom";

const INITIAL_FILTERS = {
  type: "",
  region: [],
  mood: [],
  search: "",
};

const ITEMS_PER_LOAD = 6;

const OurDestination = () => {
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  // Filters being edited in the UI
  const [draftFilters, setDraftFilters] = useState(INITIAL_FILTERS);

  // Filters actually applied to the data
  const [appliedFilters, setAppliedFilters] = useState(INITIAL_FILTERS);

  const selectCard = (destination) => {
    setSelectedCard(destination);
  };
  const closeModal = () => {
    setSelectedCard(null);
  };

  const { savedDestinationIds } = useShortlist();
  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const all = getAllDestinations();
        setFilteredDestinations(all);
      } catch (error) {
        console.error("Error loading destination", error);
      }
    };
    loadDestinations();
  }, []);

  useEffect(() => {
    const filterData = async () => {
      try {
        const filtered = filterDestinations(appliedFilters);
        setFilteredDestinations(filtered);

        setVisibleCount(ITEMS_PER_LOAD);
      } catch (error) {
        console.error("Error filtering data", error);
      }
    };

    filterData();
  }, [appliedFilters]);

  const handleApplyFilters = () => {
    setAppliedFilters(draftFilters);
  };

  const handleResetFilters = () => {
    setDraftFilters(INITIAL_FILTERS);
    setAppliedFilters(INITIAL_FILTERS);
  };

  const { toggleSavedDestination, isDestinationSaved } = useShortlist();

  return (
    <>
      <section className="d-flex p-2 justify-content-between ">
        <SearchFilter
          filters={draftFilters}
          onChange={setDraftFilters}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
        />

        <Link to="/ShortlistPage" className="text-decoration-none text-dark">
          Shortlisted Destinations ({savedDestinationIds.length})
        </Link>
      </section>
      <section className="container my-5 bg-tertiary" id="our-destination">
        <div className="row g-4 justify-content-center">
          {filteredDestinations.slice(0, visibleCount).map((dest) => (
            <div key={dest.id} className="col-12 col-md-6 col-lg-4">
              <CardComponent
                destination={dest}
                onSelect={selectCard}
                isSaved={isDestinationSaved(dest.id)}
                onToggleSave={() => toggleSavedDestination(dest.id)}
              />
            </div>
          ))}
        </div>
        {!filteredDestinations.length && (
          <p className="text-center my-5">
            No destinations match those filters yet.
          </p>
        )}
        {selectedCard && (
          <ModalComponent
            destination={selectedCard}
            onClose={closeModal}
            isSaved={isDestinationSaved(selectedCard.id)}
            onToggleSave={() => toggleSavedDestination(selectedCard.id)}
          />
        )}
      </section>

      {visibleCount < filteredDestinations.length && (
        <div className="text-center mt-4">
          <button
            className="btn btn-primary mb-3"
            onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_LOAD)}
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};
export default OurDestination;
