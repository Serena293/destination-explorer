import { useEffect, useState } from "react";
import { ShortlistContext } from "./ShortlistContext.js";

const STORAGE_KEY = "destination-explorer-shortlist";

const readSavedDestinationIds = () => {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue);

    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch (error) {
    console.error("Unable to read the saved shortlist:", error);
    return [];
  }
};

const ShortlistProvider = ({ children }) => {
  const [savedDestinationIds, setSavedDestinationIds] = useState(
    readSavedDestinationIds,
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(savedDestinationIds),
      );
    } catch (error) {
      console.error("Unable to save the shortlist:", error);
    }
  }, [savedDestinationIds]);

  const toggleSavedDestination = (destinationId) => {
    setSavedDestinationIds((currentIds) =>
      currentIds.includes(destinationId)
        ? currentIds.filter((id) => id !== destinationId)
        : [...currentIds, destinationId],
    );
  };

  const isDestinationSaved = (destinationId) => {
    return savedDestinationIds.includes(destinationId);
  };

  const contextValue = {
    savedDestinationIds,
    toggleSavedDestination,
    isDestinationSaved,
  };

  return (
    <ShortlistContext value={contextValue}>
      {children}
    </ShortlistContext>
  );
};

export default ShortlistProvider;