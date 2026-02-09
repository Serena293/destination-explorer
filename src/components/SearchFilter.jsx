import { useState } from "react";
import { Button, Collapse, Card } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const SearchFilter = ({ filters, onChange, onApply, onReset }) => {
  const [open, setOpen] = useState(true);

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
    <div className="mb-3">
      {/* Toggle button centrato */}
      <div className="text-center mb-2">
        <Button
          variant="primary"
          onClick={() => setOpen(!open)}
        >
          {open ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>} Filters
        </Button>
      </div>

      {/* Collapsible filter content */}
      <Collapse in={open}>
        <div>
          <Card className="p-3 bg-light shadow-sm rounded">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onApply();
              }}
            >
              {/* Search input */}
              <div className="mb-3">
                <h5 className="mb-2">Search Destinations</h5>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name or description..."
                  value={filters.search}
                  onChange={(e) =>
                    onChange({ ...filters, search: e.target.value })
                  }
                />
              </div>

              <div className="row">
                {/* Mood */}
                <div className="col-md-6 mb-3">
                  <h5 className="mb-2">Mood</h5>
                  {availableMoods.map((mood) => (
                    <div key={mood} className="form-check">
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
                  ))}
                </div>

                {/* Region */}
                <div className="col-md-6 mb-3">
                  <h5 className="mb-2">Region</h5>
                  {availableRegions.map((region) => (
                    <div key={region} className="form-check">
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
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="d-flex flex-row-reverse mt-3">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="mx-2"
                  type="button"
                  onClick={onReset}
                  disabled={
                    !filters.mood.length &&
                    !filters.region.length &&
                    !filters.search
                  }
                >
                  Reset Filters
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  className="mx-2 "
                >
                  Apply Filters
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </Collapse>
    </div>
  );
};

export default SearchFilter;
