import { useEffect, useMemo, useState } from "react";
import CardComponent from "./CardComponent";
import ModalComponent from "./ModalComponent";
import SearchFilter from "./SearchFilter";
import { useShortlist } from "../context/ShortlistContext";
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

const SORT_OPTIONS = {
  recommended: "Recommended",
  name: "Name A-Z",
  region: "Region A-Z",
  mood: "Primary mood A-Z",
};

const OurDestination = () => {
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [sortBy, setSortBy] = useState("recommended");

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

  const {
    savedDestinationIds,
    toggleSavedDestination,
    isDestinationSaved,
  } = useShortlist();

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

  const activeFilterCount =
    appliedFilters.region.length +
    appliedFilters.mood.length +
    (appliedFilters.search.trim() ? 1 : 0) +
    (appliedFilters.type ? 1 : 0);

  const sortedDestinations = useMemo(() => {
    const destinations = [...filteredDestinations];

    if (sortBy === "name") {
      return destinations.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "region") {
      return destinations.sort(
        (a, b) =>
          a.region.localeCompare(b.region) || a.name.localeCompare(b.name),
      );
    }

    if (sortBy === "mood") {
      return destinations.sort(
        (a, b) =>
          (a.mood[0] ?? "").localeCompare(b.mood[0] ?? "") ||
          a.name.localeCompare(b.name),
      );
    }

    return destinations;
  }, [filteredDestinations, sortBy]);

  return (
    <main className="container py-4 py-md-5" id="our-destination">
      <header className="catalog-heading mb-4">
        <div>
          <h1 className="h2 mb-1">Explore destinations</h1>
          <p className="text-body-secondary mb-0">
            Find a place that matches the way you want to travel.
          </p>
        </div>

        <Link
          to="/ShortlistPage"
          className="catalog-shortlist-link"
          aria-label={`View shortlist with ${savedDestinationIds.length} saved destinations`}
        >
          <i className="bi bi-bookmark-fill" aria-hidden="true" />
          <span>Shortlist</span>
          <span className="badge text-bg-secondary">
            {savedDestinationIds.length}
          </span>
        </Link>
      </header>

      <section className="catalog-toolbar" aria-label="Destination controls">
        <p className="catalog-result-count mb-0" aria-live="polite">
          {sortedDestinations.length}{" "}
          {sortedDestinations.length === 1 ? "destination" : "destinations"}
        </p>

        <div className="catalog-toolbar-actions">
          <SearchFilter
            filters={draftFilters}
            onChange={setDraftFilters}
            onApply={handleApplyFilters}
            onReset={handleResetFilters}
            activeFilterCount={activeFilterCount}
          />

          <div className="catalog-sort">
            <label htmlFor="destination-sort">Sort by</label>
            <select
              id="destination-sort"
              className="form-select"
              value={sortBy}
              onChange={(event) => {
                setSortBy(event.target.value);
                setVisibleCount(ITEMS_PER_LOAD);
              }}
            >
              {Object.entries(SORT_OPTIONS).map(([value, label]) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="mt-4 bg-tertiary" aria-label="Destination results">
        <div className="row g-4 justify-content-center">
          {sortedDestinations.slice(0, visibleCount).map((dest) => (
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
        {!sortedDestinations.length && (
          <div className="catalog-empty-state text-center">
            <i className="bi bi-search" aria-hidden="true" />
            <h2 className="h4 mt-3">No destinations found</h2>
            <p className="text-body-secondary">
            No destinations match those filters yet.
            </p>
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleResetFilters}
            >
              Reset filters
            </button>
          </div>
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

      {visibleCount < sortedDestinations.length && (
        <div className="text-center mt-4">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_LOAD)}
          >
            Load more destinations
          </button>
        </div>
      )}
    </main>
  );
};
export default OurDestination;
