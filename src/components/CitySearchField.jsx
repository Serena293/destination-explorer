import { useState, useEffect} from "react";
import { searchCities } from "../services/cityService";

const CitySearchField = ({
  id,
  label,
  helpText,
  value,
  onChange,
  disabled = false,
  required = false,
  ariaInvalid,
  ariaDescribedby,
}) => {
  const [query, setQuery] = useState(
    value ? `${value.name}, ${value.country}` : "",
  );
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
  setQuery(value ? `${value.name}, ${value.country}` : "");
}, [value]);

  const handleSearch = async () => {
    setError("");
    setResults([]);

    if (query.trim().length < 3) {
      setError("Enter at least three characters.");
      return;
    }

    try {
      setIsSearching(true);
      const cities = await searchCities(query);
      setResults(cities);
      if (cities.length === 0) setError("No cities found.");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSearching(false);
    }
  };

  const selectCity = (city) => {
    onChange(city);
    setQuery(`${city.name}, ${city.country}`);
    setResults([]);
    setError("");
  };

  return (
    <div className="mb-3">
      {label && (
        <label className="form-label" htmlFor={id}>
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}

      <div className="d-flex gap-2">
        <input
          id={id}
          className="form-control"
          type="text"
          value={query}
          disabled={disabled}
          onChange={(e) => {
            setQuery(e.target.value);
            if (value) onChange(null);
          }}
          aria-describedby={
            [
              helpText ? `${id}-help` : null,
              ariaDescribedby,
              error ? `${id}-internal-error` : null,
            ]
              .filter(Boolean)
              .join(" ") || undefined
          }
          aria-invalid={ariaInvalid || Boolean(error)}
          required={required}
        />
        <button
          className="btn btn-secondary"
          type="button"
          onClick={handleSearch}
          disabled={disabled || isSearching}
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>

      {helpText && (
        <p id={`${id}-help`} className="form-text">
          {helpText}
        </p>
      )}

      {error && (
        <p id={`${id}-internal-error`} className="text-danger" role="alert">
          {error}
        </p>
      )}

      {results.length > 0 && (
        <ul className="list-group mt-2" aria-label="City search results">
          {results.map((city) => (
            <li className="list-group-item p-0" key={city.id}>
              <button
                className="btn w-100 text-start p-3"
                type="button"
                onClick={() => selectCity(city)}
              >
                <strong>{city.name}</strong>
                <span className="d-block">
                  {city.country} ({city.countryCode})
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {value && (
        <p className="mt-2 text-success" role="status">
          Selected: {value.name}, {value.country}
        </p>
      )}
    </div>
  );
};

export default CitySearchField;
