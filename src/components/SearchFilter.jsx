import { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const SearchFilter = ({
  filters,
  onChange,
  onApply,
  onReset,
  activeFilterCount,
}) => {
  const [show, setShow] = useState(false);

  const availableMoods = [
    "history",
    "culture",
    "food",
    "nature",
    "beach",
    "city-life",
    "luxury",
    "adventure",
    "relaxation",
  ];

  const availableRegions = ["Europe", "North America", "Oceania", "Asia"];

  const toggleMood = (mood) => {
    onChange({
      ...filters,
      mood: filters.mood.includes(mood)
        ? filters.mood.filter((m) => m !== mood)
        : [...filters.mood, mood],
    });
  };

  const toggleRegion = (region) => {
    onChange({
      ...filters,
      region: filters.region.includes(region)
        ? filters.region.filter((r) => r !== region)
        : [...filters.region, region],
    });
  };

  return (
    <>
      <Offcanvas show={show} onHide={() => setShow(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              onApply();
              setShow(false);
            }}
          >
            <div className="mb-4">
              <label className="form-label fw-semibold" htmlFor="filter-search">
                Search destinations
              </label>
              <input
                id="filter-search"
                type="search"
                className="form-control"
                placeholder="Name, country, or description"
                value={filters.search}
                onChange={(event) =>
                  onChange({ ...filters, search: event.target.value })
                }
              />
            </div>

            <fieldset className="mb-4">
              <legend className="h6">Mood</legend>
              <div className="row">
                {availableMoods.map((mood) => (
                  <div className="col-6 mb-2" key={mood}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`mood-${mood}`}
                        checked={filters.mood.includes(mood)}
                        onChange={() => toggleMood(mood)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`mood-${mood}`}
                      >
                        {mood.charAt(0).toUpperCase() + mood.slice(1)}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset className="mb-4">
              <legend className="h6">Region</legend>
              <div className="row">
                {availableRegions.map((region) => (
                  <div className="col-12 mb-2" key={region}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`region-${region}`}
                        checked={filters.region.includes(region)}
                        onChange={() => toggleRegion(region)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`region-${region}`}
                      >
                        {region}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>

            <div className="d-flex gap-2">
              <Button
                variant="primary"
                type="submit"
                className="flex-grow-1"
              >
                Apply filters
              </Button>
              <Button
                variant="outline-secondary"
                type="button"
                onClick={onReset}
                disabled={
                  !filters.mood.length &&
                  !filters.region.length &&
                  !filters.search
                }
              >
                Reset
              </Button>
            </div>
          </form>
        </Offcanvas.Body>
      </Offcanvas>

      <Button
        variant="outline-secondary"
        className="catalog-filter-button"
        onClick={() => setShow(true)}
      >
        <i className="bi bi-funnel" aria-hidden="true" />
        <span>Filters</span>
        {activeFilterCount > 0 && (
          <span className="badge text-bg-secondary">{activeFilterCount}</span>
        )}
      </Button>
    </>
  );
};

export default SearchFilter;
