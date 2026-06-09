import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // The 3D globe lives on a lazy-loaded route, so its larger chunk is expected.
    chunkSizeWarningLimit: 2000,
  },
});
