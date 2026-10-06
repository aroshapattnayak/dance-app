import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// BASE_PATH lets the same build deploy to a user site ("/") or a
// project site ("/some-repo/"). GitHub Actions sets it; local dev uses "/".
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || "/",
  server: { port: 5180 },
});
