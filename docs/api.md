# API Notes

The app currently uses local JSON data from `src/destination.json`. This keeps
the portfolio version fast, deterministic, and easy to review.

Potential future integrations:

| Source | Use case | URL |
| --- | --- | --- |
| REST Countries | Country, currency, flag, and region metadata | https://restcountries.com/ |
| Wikipedia REST API | Destination summaries and links | https://www.mediawiki.org/wiki/API:REST_API |
| OpenTripMap | Attractions and points of interest | https://dev.opentripmap.org/product |
| Unsplash | Destination photography | https://unsplash.com/documentation |

## Integration Approach

- Keep `destinationService.js` as the single data access layer.
- Cache or normalize remote responses before they reach UI components.
- Keep local JSON as a fallback so the app remains usable if an API fails.
- Add loading and error states before introducing live network requests.

