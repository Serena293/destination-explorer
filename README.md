# Destination Explorer

Destination Explorer is a responsive React travel discovery app that helps
people explore places, narrow down options, save favourites, and build a
personalised trip brief.

The project is designed as a portfolio application focused on product thinking,
accessible frontend development, API integration, shared state, and reliable
delivery workflows.

## Features

- Immersive home page with featured destination ideas
- Destination catalogue powered by structured local JSON data
- Search by destination name, country, or description
- Region and mood filters with active-filter counts
- Sorting by name, region, or primary mood
- Destination cards, responsive detail modal, and incremental browsing
- Shared shortlist state with persistence through `localStorage`
- Shortlist page with saved-count feedback and empty states
- City search powered by the Open-Meteo Geocoding API
- Bespoke trip brief with validation and Formspree submission
- Interactive 3D globe with selected cities, animated route arcs, and camera
  positioning
- React Router navigation without full page reloads
- Lazy loading for the heavier 3D trip planner route
- Responsive and keyboard-friendly Bootstrap-based interface

## Tech Stack

- React
- Vite
- React Router
- React Bootstrap and Bootstrap Icons
- React Globe GL and Three.js
- Open-Meteo Geocoding API
- Formspree
- Browser `localStorage`
- Sass and CSS
- ESLint

## Getting Started

Install dependencies:

```bash
npm install
```

Run the local dev server:

```bash
npm run dev
```

Check code quality:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

## Project Structure

```text
src/
  components/           Reusable UI and feature components
  context/              Shared shortlist state and persistence
  pages/                Page-level views
  services/             Destination data and city-search integrations
  scss/                 Custom Bootstrap overrides and hero styles
  destination.json      Local destination dataset
public/
  assets/               Shared static assets
  destinations/         Destination photography
docs/
  api.md                External API notes and future data ideas
  interface.md          Destination data contract
```

## Portfolio Focus

The project is designed to show:

- product thinking around reducing travel-planning decision friction
- reusable components, controlled forms, routing, and shared React state
- asynchronous API requests with loading and error handling
- accessible labels, status messages, keyboard controls, and responsive layouts
- persistence, validation, third-party form submission, and 3D visualisation
- code quality checks and production builds before delivery

## Data and Integrations

- Destination catalogue data lives in `src/destination.json`.
- City search uses the Open-Meteo Geocoding API and normalises responses through
  `cityService.js`.
- Trip briefs are validated locally before being submitted through Formspree.
- Saved destination IDs are stored in `localStorage`.

## Current Roadmap

- Add unit tests for destination filtering and city search
- Add component tests for filters, cards, and modal behaviour
- Add an end-to-end test for the shortlist and trip brief flows
- Add richer destination metadata such as budget and best season
- Deploy the production build and add the live URL and screenshots to this file
