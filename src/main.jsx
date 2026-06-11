import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./scss/custom-bootstrap.scss";
import ShortlistProvider from "./context/ShortlistProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ShortlistProvider>
      <App />
    </ShortlistProvider>
  </StrictMode>,
);
