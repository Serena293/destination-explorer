// src/services/destinationService.js
import destinationsData from "../destination.json";

/**
 * Get all destinations
 * @returns {Array} Array of destination objects
 */
export const getAllDestinations = () => {
  return destinationsData;
};

/**
 * Filter destinations by criteria
 * @param {Object} filters
 * @param {string} filters.type - 'city' | 'country' | 'region'
 * @param {string} filters.region - 'Europe'
 * @param {string} filters.mood - 'culture'
 * @returns {Array} Filtered destinations
 */
export const filterDestinations = ({ type, region, mood, search}) => {
  return destinationsData.filter((dest) => {
    let matches = true;

    if (type) {
      matches = matches && dest.type === type;
    }

    if (region.length) {
      matches = matches && region.includes(dest.region);
    }

    if (mood.length) {
      matches = matches && mood.some((m) => dest.mood.includes(m));
    }
    
    if (search) {
      const term = search.toLowerCase();
      matches =
        matches &&
        (dest.name.toLowerCase().includes(term) ||
          dest.description.toLowerCase().includes(term) ||
          dest.country.toLowerCase().includes(term));
    }
    return matches;
  });
};

/**
 * Get destination by ID
 * @param {string} id
 * @returns {Object|null} destination object
 */
export const getDestinationById = (id) => {
  return destinationsData.find((dest) => dest.id === id) || null;
};
