import { useState } from "react";
import "../style.css";
import CitySearchField from "./CitySearchField";
import { useForm, ValidationError } from "@formspree/react";

const INTEREST_OPTIONS = [
  "Culture",
  "Food",
  "Nature",
  "Beach",
  "Adventure",
  "Relaxation",
];

const ERROR_MESSAGES = {
  departure: "Select a departure city from the results.",
  destination: "Select a destination or choose flexible.",
  departureDate: "Select a date or choose flexible dates.",
  name: "Enter a valid name (3 char min).",
  email: "Enter a valid email address.",
  consent: "Confirm that we can contact you about this trip.",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TripPreferencesForm = ({
  departure,
  setDeparture,
  destination,
  setDestination,
  flexibleDestination,
  setFlexibleDestination,
}) => {
  const [departureDate, setDepartureDate] = useState("");
  const [flexibleDates, setFlexibleDates] = useState(false);
  const [travellers, setTravellers] = useState(1);
  const [days, setDays] = useState(1);
  const [budget, setBudget] = useState(500);
  const [interests, setInterests] = useState([]);
  const [notes, setNotes] = useState("");
 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});

  const [formspreeState, submitToFormspree] = useForm("xnjybgyr");

  const toggleInterest = (interest) => {
    setInterests((currentInterests) =>
      currentInterests.includes(interest)
        ? currentInterests.filter((item) => item !== interest)
        : [...currentInterests, interest],
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!departure) {
      nextErrors.departure = ERROR_MESSAGES.departure;
    }

    if (!destination && !flexibleDestination) {
      nextErrors.destination = ERROR_MESSAGES.destination;
    }

    if (!departureDate && !flexibleDates) {
      nextErrors.departureDate = ERROR_MESSAGES.departureDate;
    }

    if (name.trim().length < 3) {
      nextErrors.name = ERROR_MESSAGES.name;
    }

    if (!EMAIL_PATTERN.test(email.trim())) {
      nextErrors.email = ERROR_MESSAGES.email;
    }

    if (!consent) {
      nextErrors.consent = ERROR_MESSAGES.consent;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
   
      return;
    }

    await submitToFormspree({
      name: name.trim(),
      email: email.trim(),

      departure: `${departure.name}, ${departure.country}`,

      destination: flexibleDestination
        ? "Flexible"
        : `${destination.name}, ${destination.country}`,

      departureDate: flexibleDates ? "Flexible" : departureDate,

      tripLengthDays: days,
      travellers,
      budget: `£${budget}`,

      interests: interests.length ? interests.join(", ") : "None selected",

      notes: notes.trim() || "No additional notes",

      consent,

      departureLatitude: departure.latitude,
      departureLongitude: departure.longitude,

      destinationLatitude: destination?.latitude ?? "",
      destinationLongitude: destination?.longitude ?? "",
    });
  };

  const clearError = (field) => {
    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
  };

  return (
    <section className="container py-5">
      <header className="mb-4">
        <h2>Build your trip brief</h2>
        <p>
          Tell us what you have in mind. Whether you are planning a day trip or
          a journey around the globe, we can help.
        </p>
      </header>

      <form onSubmit={handleSubmit}>
        <fieldset className="mb-4">
          <legend>Where</legend>
          <div>
            <CitySearchField
              label="City or departure airport"
              helpText="Enter at least three characters, then select a city."
              value={departure}
              onChange={(city) => {
                setDeparture(city);

                if (city) {
                  clearError("departure");
                }
              }}
              id="departure"
              required
              ariaInvalid={Boolean(errors.departure)}
              ariaDescribedBy={
                errors.departure ? "departure-error" : undefined
              }
            />
            {errors.departure && (
              <p id="departure-error" className="text-danger mt-1" role="alert">
                {errors.departure}
              </p>
            )}
          </div>
          <div>
            <CitySearchField
              label="Destination"
              value={destination}
              onChange={setDestination}
              disabled={flexibleDestination}
              id="destination"
              ariaInvalid={Boolean(errors.destination)}
              ariaDescribedBy={
                errors.destination ? "destination-error" : undefined
              }
            />

            {errors.destination && (
              <p
                id="destination-error"
                className="text-danger mt-1"
                role="alert"
              >
                {errors.destination}
              </p>
            )}
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexible-destination"
              checked={flexibleDestination}
              onChange={(event) => {
                const isFlexible = event.target.checked;
                setFlexibleDestination(isFlexible);

                if (isFlexible) {
                  setDestination(null);
                  clearError("destination");
                }
              }}
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
              aria-invalid={Boolean(errors.departureDate)}
              aria-describedby={
                errors.departureDate ? "departure-date-error" : undefined
              }
            />

            {errors.departureDate && (
              <p
                id="departure-date-error"
                className="text-danger mt-1"
                role="alert"
              >
                {errors.departureDate}
              </p>
            )}
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
              onChange={(event) => {
                const isFlexible = event.target.checked;

                setFlexibleDates(isFlexible);
                if (isFlexible) {
                  setDepartureDate("");
                  clearError("departureDate");
                }
              }}
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
        <fieldset className="mb-4">
          <legend>Contacts</legend>

          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              className="form-control"
              id="name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                clearError("name");
              }}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className="text-danger" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              className="form-control"
              id="email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                clearError("email");
              }}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-danger" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="contact-consense"
              checked={consent}
              onChange={(event) => {
                setConsent(event.target.checked);
                clearError("consent");
              }}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? "consent-error" : undefined}
            />
            <label className="form-check-label" htmlFor="contact-consense">
              Confirm that we can contact you about this trip
            </label>
            {errors.consent && (
              <p id="consent-error" className="text-danger mt-1" role="alert">
                {errors.consent}
              </p>
            )}
          </div>
        </fieldset>

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
            {flexibleDestination
              ? "Flexible"
              : destination
                ? `${destination.name}, ${destination.country}`
                : "Not selected"}
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
          <p>
            <strong>Name:</strong>
            {name}
          </p>
          <p><strong>Email address:</strong>
          {email}</p>
        </section>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={formspreeState.submitting}
        >
          {formspreeState.submitting
            ? "Sending trip brief..."
            : "Send trip brief"}
        </button>

        <ValidationError
          errors={formspreeState.errors}
          className="text-danger mt-3"
        />

        {formspreeState.succeeded && (
          <p className="text-success mt-3" role="status">
            Your trip brief has been sent successfully.
          </p>
        )}
      </form>
    </section>
  );
};

export default TripPreferencesForm;
