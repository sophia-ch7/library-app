import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 9000,
  },
  build: {
    outDir: "dist",
  },
  base: "./",
});
