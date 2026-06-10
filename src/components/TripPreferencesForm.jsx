import { useState } from "react";
import "../style.css";
import CitySearchField from "./CitySearchField";

const INTEREST_OPTIONS = [
  "Culture",
  "Food",
  "Nature",
  "Beach",
  "Adventure",
  "Relaxation",
];

const TripPreferencesForm = ({departure,setDeparture, destination, setDestination, flexibleDestination, setFlexibleDestination}) => {
  // const [departure, setDeparture] = useState(null);
  // const [destination, setDestination] = useState(null);
  // const [flexibleDestination, setFlexibleDestination] = useState(false);
  const [departureDate, setDepartureDate] = useState("");
  const [flexibleDates, setFlexibleDates] = useState(false);
  const [travellers, setTravellers] = useState(1);
  const [days, setDays] = useState(1);
  const [budget, setBudget] = useState(500);
  const [interests, setInterests] = useState([]);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleInterest = (interest) => {
    setInterests((currentInterests) =>
      currentInterests.includes(interest)
        ? currentInterests.filter((item) => item !== interest)
        : [...currentInterests, interest],
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

 
  return (
    <section className="container py-5">
      <header className="mb-4">
        <h1>Build your trip brief</h1>
        <p>
          Tell us what you have in mind. Whether you are planning a day trip or
          a journey around the globe, we can help.
        </p>
      </header>

      <form onSubmit={handleSubmit}>
        <fieldset className="mb-4">
          <legend>Where</legend>

          <CitySearchField
            label="City or departure airport"
            helpText="Enter at least three characters, then select a city."
            value={departure}
            onChange={setDeparture}
            required
          />
          <CitySearchField
            label="Destination"
            value={destination}
            onChange={setDestination}
            disabled={flexibleDestination}
          />

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexible-destination"
              checked={flexibleDestination}
              onChange={(event) => setFlexibleDestination(event.target.checked)}
            />
            <label className="form-check-label" htmlFor="flexible-destination">
              I am flexible about the destination
            </label>
          </div>
        </fieldset>

        <fieldset className="mb-4">
          <legend>When</legend>

          <div className="mb-3">
            <label className="form-label" htmlFor="departure-date">
              Preferred departure date
            </label>
            <input
              className="form-control"
              type="date"
              id="departure-date"
              value={departureDate}
              onChange={(event) => setDepartureDate(event.target.value)}
              disabled={flexibleDates}
              required={!flexibleDates}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="days">
              Trip length in days
            </label>
            <input
              className="form-control"
              type="number"
              id="days"
              min="1"
              max="365"
              value={days}
              onChange={(event) => setDays(Number(event.target.value))}
              required
            />
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexible-dates"
              checked={flexibleDates}
              onChange={(event) => setFlexibleDates(event.target.checked)}
            />
            <label className="form-check-label" htmlFor="flexible-dates">
              My dates are flexible
            </label>
          </div>
        </fieldset>

        <fieldset className="mb-4">
          <legend>Travellers and budget</legend>

          <div className="mb-3">
            <label className="form-label" htmlFor="travellers">
              Number of travellers
            </label>
            <input
              className="form-control"
              type="number"
              id="travellers"
              min="1"
              max="20"
              value={travellers}
              onChange={(event) => setTravellers(Number(event.target.value))}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="budget">
              Total budget: £{budget}
            </label>
            <input
              className="form-range budget-range"
              type="range"
              id="budget"
              min="50"
              max="5000"
              step="50"
              value={budget}
              onChange={(event) => setBudget(Number(event.target.value))}
              aria-valuetext={`£${budget}`}
            />
          </div>
        </fieldset>

        <fieldset className="mb-4">
          <legend>Travel interests</legend>

          <div className="row">
            {INTEREST_OPTIONS.map((interest) => {
              const interestId = `interest-${interest.toLowerCase()}`;

              return (
                <div className="col-6 col-md-4 mb-2" key={interest}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={interestId}
                      checked={interests.includes(interest)}
                      onChange={() => toggleInterest(interest)}
                    />
                    <label className="form-check-label" htmlFor={interestId}>
                      {interest}
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </fieldset>

        <div className="mb-4">
          <label className="form-label" htmlFor="notes">
            Additional notes
          </label>
          <textarea
            className="form-control"
            id="notes"
            rows="4"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>

        <section className="mb-4" aria-labelledby="trip-summary-title">
          <h2 id="trip-summary-title">Your trip summary</h2>

          <p>
            <strong>From:</strong>{" "}
            {departure
              ? `${departure.name}, ${departure.country}`
              : "Not selected"}
          </p>
          <p>
            <strong>Destination:</strong>
            {flexibleDestination ? "Flexible" 
            : destination  
            ? `${destination.name}, ${destination.country}`: "Not selected"}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {flexibleDates ? "Flexible" : departureDate || "Not selected"}
          </p>
          <p>
            <strong>Trip:</strong> {days} days, {travellers} travellers
          </p>
          <p>
            <strong>Budget:</strong> £{budget}
          </p>
          <p>
            <strong>Interests:</strong>{" "}
            {interests.length ? interests.join(", ") : "None selected"}
          </p>
        </section>

        <button className="btn btn-primary" type="submit">
          Complete trip brief
        </button>

        {submitted && (
          <p className="mt-3" role="status">
            Your trip brief is ready.
          </p>
        )}
      </form>
    </section>
  );
};

export default TripPreferencesForm;
