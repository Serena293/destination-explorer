const SearchFilter = ({ filters, onChange, onApply, onReset }) => {
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onApply();
      }}
    >
      <div className="search-filter-container p-4 mb-4 bg-light rounded shadow-sm px-5">
        <div className="mb-4">
          <h5 className="mb-2">Search Destinations</h5>
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or description..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
          />
        </div>

        <div className="row">
          {/* MOOD */}
          <div className="col-md-6 mb-3">
            <h5 className="mb-2">Mood</h5>
            <div className="filter-options">
              {availableMoods.map((mood) => (
                <div key={mood} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`mood-${mood}`}
                    checked={filters.mood.includes(mood)}
                    onChange={() => toggleMood(mood)}
                  />
                  <label className="form-check-label" htmlFor={`mood-${mood}`}>
                    {mood.charAt(0).toUpperCase() + mood.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* REGION */}
          <div className="col-md-6 mb-3">
            <h5 className="mb-2">Region</h5>
            <div className="filter-options">
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
        </div>

        <div className="d-flex flex-row-reverse m-3">
          <button
            className="btn btn-outline-secondary btn-sm mx-2"
            onClick={onReset}
            disabled={!filters.mood && !filters.region}
            type="button"
          >
            Reset Filters
          </button>{" "}
          <button
            className="btn btn-outline-primary mx-2 bg-primary text-white"
            type="submit"
          >
            Apply filters
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchFilter;
