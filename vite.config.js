import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// For GitHub Pages under a repo path (e.g. https://user.github.io/Imtechwiz/),
// run:  VITE_BASE=/Imtechwiz/ npm run build
// For a custom domain / root deploy, leave it unset.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || "/",
});
