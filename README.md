# Destination Explorer

Destination Explorer is a React travel discovery app for browsing destinations,
filtering them by region and trip mood, and opening richer destination details.
It is built as a portfolio project to practice product thinking, frontend
implementation, structured data, and clean delivery workflows.

## Features

- Destination catalogue powered by structured local JSON data
- Search by destination name, country, or description
- Region and mood filters with an offcanvas filter panel
- Destination cards, detail modal, and incremental "Load More" browsing
- Bespoke trip page with an interactive 3D globe prototype
- React Router navigation without full page reloads
- Lazy loading for the heavier 3D trip planner route
- Responsive Bootstrap-based layout with custom visual styling

## Tech Stack

- React
- Vite
- React Router
- React Bootstrap and Bootstrap Icons
- React Globe GL and Three.js
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
  components/           Reusable UI components
  pages/                Page-level views
  services/             Destination data access and filtering logic
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

- how a travel-planning interface can reduce decision friction
- how UI state, filtering, routing, and reusable components fit together
- how to turn static data into a small but complete user experience
- how to document and verify a frontend project before sharing it

## Next Improvements

- Add a shortlist feature so users can save and compare destinations
- Add unit tests for the filtering service
- Add component tests for filters, cards, and modal behaviour
- Add richer destination metadata such as budget, best season, and trip length
- Integrate a public API for country, weather, or travel context data
