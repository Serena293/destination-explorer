const GEOCODING_API_URL =
  "https://geocoding-api.open-meteo.com/v1/search";

/**
 * Searches for cities and returns data in the format used by the app.
 *
 * @param {string} query City or postcode entered by the user.
 * @param {AbortSignal} [signal] Optional signal used to cancel the request.
 * @returns {Promise<Array<{
 *   id: number,
 *   name: string,
 *   country: string,
 *   countryCode: string,
 *   latitude: number,
 *   longitude: number,
 *   timezone: string
 * }>>}
 */
export const searchCities = async (query, signal) => {
  const searchTerm = query.trim();

  if (searchTerm.length < 3) {
    return [];
  }

  const parameters = new URLSearchParams({
    name: searchTerm,
    count: "5",
    language: "en",
    format: "json",
  });

  const response = await fetch(`${GEOCODING_API_URL}?${parameters}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error("Unable to search for cities. Please try again.");
  }

  const data = await response.json();

  return (data.results ?? []).map((city) => ({
    id: city.id,
    name: city.name,
    country: city.country ?? "",
    countryCode: city.country_code ?? "",
    latitude: city.latitude,
    longitude: city.longitude,
    timezone: city.timezone ?? "",
  }));
};
