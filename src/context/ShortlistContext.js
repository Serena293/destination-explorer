import { createContext, useContext } from "react";

export const ShortlistContext = createContext(null);

export const useShortlist = () => {
  const context = useContext(ShortlistContext);

  if (!context) {
    throw new Error(
      "useShortlist must be used inside a ShortlistProvider",
    );
  }

  return context;
};