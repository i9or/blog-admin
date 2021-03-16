/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
  // TODO: remove once https://github.com/vitest-dev/vitest/issues/2474 resolved
  // @ts-ignore
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
