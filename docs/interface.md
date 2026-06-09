# Destination Data Contract

Every destination in the app should follow this structure:

```ts
type Destination = {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  currency: string;
  description: string;
  imageUrl: string;
  type: "city" | "region" | "country";
  region: "Europe" | "North America" | "Oceania" | "Asia";
  mood: string[];
};
```

## Notes

- `id` should be short, stable, and unique.
- `imageUrl` should point to an image in `public/destinations`.
- `mood` powers the checkbox filters, so values should stay consistent.
- Future fields could include `bestSeason`, `averageBudget`, `tripLength`, and
  `attractions`.
