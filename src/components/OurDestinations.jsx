import { useState, useEffect } from "react";
import CardComponent from "./CardComponent";
import ModalComponent from "./ModalComponent";
import SearchFilter from "./SearchFilter";

import {
  getAllDestinations,
  filterDestinations,
} from "../services/destinationService";

const INITIAL_FILTERS = {
  type: "",
  region: [],
  mood: [],
  search: "",
};

const OurDestination = () => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

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

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const all = getAllDestinations();
        setDestinations(all);
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

  return (
    <>
      <SearchFilter
        filters={draftFilters}
        onChange={setDraftFilters}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />

      <section className="container my-5" id="our-destination">
        <div className="row g-4 justify-content-center">
          {filteredDestinations.map((dest) => (
            <CardComponent
              key={dest.id}
              destination={dest}
              onSelect={selectCard}
            />
          ))}
        </div>
        {selectedCard && (
          <ModalComponent destination={selectedCard} onClose={closeModal} />
        )}
      </section>
    </>
  );
};
export default OurDestination;
