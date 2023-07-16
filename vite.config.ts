import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "extension");
const publicDir = resolve(__dirname, "public");

// https://vitejs.dev/config/
export default defineConfig({
  root,
  publicDir,
  build: {
    outDir,
    emptyOutDir: false,
    rollupOptions: {
      input: {
        browser: resolve(root, "index.html"),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 8000,
    open: true,
  },
  plugins: [react(), tsconfigPaths()],
});
